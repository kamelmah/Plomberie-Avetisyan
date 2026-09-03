import { createServerFn } from '@tanstack/react-start'
import { site } from '~/lib/site'
import { PHOTOS_MAX } from '~/lib/photos'
import { lienPhotos } from './storage'
import { composerSms, notifierParSms } from './sms'

export type DevisInput = {
  nom: string
  telephone: string
  email: string
  codePostal: string
  prestation: string
  urgence: string
  message: string
  /** Chemins Supabase des photos déjà téléversées par le navigateur. */
  photos: Array<string>
  /** Honeypot : doit rester vide. Non affiché aux humains. */
  societe: string
}

export type DevisResult = { ok: true } | { ok: false; error: string }

const PRESTATIONS = [
  'Recherche de fuite',
  'Dépannage urgent',
  'Débouchage de canalisation',
  'Autre / je ne sais pas',
] as const

const URGENCES = ['Urgent — aujourd’hui', 'Sous 48 h', 'Pas urgent / devis'] as const

export const prestationOptions = PRESTATIONS
export const urgenceOptions = URGENCES

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

/** Valide côté serveur ; ne fait jamais confiance au HTML du client. */
function validate(raw: unknown): DevisInput {
  const d = (raw ?? {}) as Record<string, unknown>
  const input: DevisInput = {
    nom: str(d.nom).slice(0, 120),
    telephone: str(d.telephone).slice(0, 40),
    email: str(d.email).slice(0, 200),
    codePostal: str(d.codePostal).slice(0, 20),
    prestation: str(d.prestation).slice(0, 80),
    urgence: str(d.urgence).slice(0, 80),
    message: str(d.message).slice(0, 4000),
    photos: (Array.isArray(d.photos) ? d.photos : [])
      .filter((p): p is string => typeof p === 'string')
      .slice(0, PHOTOS_MAX),
    societe: str(d.societe).slice(0, 200),
  }

  const errors: Array<string> = []
  if (input.nom.length < 2) errors.push('votre nom')
  // 10 chiffres minimum une fois séparateurs et indicatif retirés
  if (input.telephone.replace(/[^\d]/g, '').length < 9) errors.push('un numéro de téléphone valide')
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email))
    errors.push('une adresse e-mail valide')
  if (input.message.length < 10) errors.push('une description de votre problème (10 caractères minimum)')

  if (errors.length) {
    throw new Error(`Merci d’indiquer ${errors.join(', ')}.`)
  }

  if (!PRESTATIONS.includes(input.prestation as (typeof PRESTATIONS)[number])) {
    input.prestation = 'Autre / je ne sais pas'
  }
  if (!URGENCES.includes(input.urgence as (typeof URGENCES)[number])) {
    input.urgence = 'Sous 48 h'
  }

  return input
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildEmail(d: DevisInput, photos: Array<string>) {
  const rows: Array<[string, string]> = [
    ['Nom', d.nom],
    ['Téléphone', d.telephone],
    ['E-mail', d.email || '—'],
    ['Code postal', d.codePostal || '—'],
    ['Prestation', d.prestation],
    ['Urgence', d.urgence],
  ]

  const text = [
    ...rows.map(([k, v]) => `${k} : ${v}`),
    '',
    'Message :',
    d.message,
    ...(photos.length ? ['', 'Photos (liens valables 30 jours) :', ...photos] : []),
  ].join('\n')

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;color:#0a2540;line-height:1.6">
  <h2 style="margin:0 0 16px;font-size:18px">Nouvelle demande de devis</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#1d3f6f;font-weight:600;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
      )
      .join('')}
  </table>
  <p style="margin:0 0 6px;font-weight:600;color:#1d3f6f">Message</p>
  <p style="margin:0 0 20px;white-space:pre-wrap">${escapeHtml(d.message)}</p>
  ${
    photos.length
      ? `<p style="margin:0 0 8px;font-weight:600;color:#1d3f6f">Photos jointes (liens valables 30 jours)</p>
  <p style="margin:0">${photos
    .map(
      (url, i) =>
        `<a href="${escapeHtml(url)}" style="display:inline-block;margin:0 8px 8px 0;padding:8px 14px;background:#378add;color:#fff;border-radius:8px;text-decoration:none;font-weight:600">Photo ${i + 1}</a>`,
    )
    .join('')}</p>`
      : ''
  }
</div>`

  return { text, html }
}

/**
 * Envoie la demande de devis par e-mail (Resend) puis notifie le gérant par SMS.
 *
 * L'e-mail fait foi : si le SMS échoue, l'erreur est journalisée et la réponse
 * au client reste un succès. L'inverse n'est pas vrai — un échec e-mail est
 * remonté à l'internaute, avec le numéro à appeler.
 *
 * Variables d'environnement — voir .env.example et le README.
 */
export const envoyerDevis = createServerFn({ method: 'POST' })
  .validator(validate)
  .handler(async ({ data }): Promise<DevisResult> => {
    // Piège à robots : on répond « ok » sans rien envoyer.
    if (data.societe) return { ok: true }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[devis] RESEND_API_KEY manquante')
      return {
        ok: false,
        error: `L’envoi du formulaire est momentanément indisponible. Appelez le ${site.phone}.`,
      }
    }

    // Un échec de signature des liens ne doit pas empêcher l'envoi de la demande.
    let photos: Array<string> = []
    try {
      photos = await lienPhotos(data.photos)
    } catch (cause) {
      console.error('[devis] liens photos indisponibles', cause)
    }

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    const { text, html } = buildEmail(data, photos)

    try {
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM || 'Site Plomberie Avetisyan <onboarding@resend.dev>',
        to: [process.env.RESEND_TO || site.email],
        replyTo: data.email || undefined,
        subject: `Devis — ${data.prestation} — ${data.nom} (${data.urgence})`,
        text,
        html,
      })

      if (error) {
        console.error('[devis] Resend a refusé l’envoi', error)
        return {
          ok: false,
          error: `Votre message n’a pas pu être transmis. Appelez le ${site.phone}.`,
        }
      }
    } catch (cause) {
      console.error('[devis] échec de l’appel Resend', cause)
      return {
        ok: false,
        error: `Votre message n’a pas pu être transmis. Appelez le ${site.phone}.`,
      }
    }

    // L'e-mail est parti : à partir d'ici, plus rien ne peut faire échouer la demande.
    const sms = await notifierParSms(
      composerSms({
        nom: data.nom,
        telephone: data.telephone,
        message: data.message,
        photos,
      }),
    )
    if (!sms.envoye) {
      console.error(
        `[devis] notification SMS non envoyée (${sms.fournisseur ?? 'aucun fournisseur'}) : ${sms.raison}`,
      )
    }

    return { ok: true }
  })
