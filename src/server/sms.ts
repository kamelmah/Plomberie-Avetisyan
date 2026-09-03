/**
 * Notification SMS au gérant à la réception d'une demande de devis.
 *
 * Deux fournisseurs pris en charge, choisis automatiquement selon les
 * variables d'environnement présentes :
 *   - Brevo  : BREVO_API_KEY, BREVO_SMS_SENDER
 *   - Twilio : TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM
 * Destinataire commun : SMS_TO (format E.164, ex. +33660600500).
 *
 * Contrat : cette fonction ne lève JAMAIS. Un échec SMS est journalisé et
 * renvoyé sous forme de valeur ; l'e-mail Resend part indépendamment et la
 * réponse au client n'est pas bloquée.
 */

export type ResultatSms = { envoye: boolean; fournisseur: string | null; raison?: string }

const TIMEOUT_MS = 8000

function tronquer(texte: string, max: number): string {
  const propre = texte.replace(/\s+/g, ' ').trim()
  return propre.length <= max ? propre : `${propre.slice(0, max - 1)}…`
}

/** Corps du SMS : nom, téléphone, 100 premiers caractères de la demande, liens photos. */
export function composerSms(input: {
  nom: string
  telephone: string
  message: string
  photos: Array<string>
}): string {
  const lignes = [
    'Devis site web',
    `${input.nom} — ${input.telephone}`,
    tronquer(input.message, 100),
  ]
  if (input.photos.length) {
    lignes.push(`Photo${input.photos.length > 1 ? 's' : ''} : ${input.photos.join(' ')}`)
  }
  return lignes.join('\n')
}

async function fetchAvecTimeout(url: string, init: RequestInit): Promise<Response> {
  const controleur = new AbortController()
  const minuteur = setTimeout(() => controleur.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controleur.signal })
  } finally {
    clearTimeout(minuteur)
  }
}

async function envoyerBrevo(destinataire: string, contenu: string): Promise<ResultatSms> {
  const reponse = await fetchAvecTimeout('https://api.brevo.com/v3/transactionalSMS/sms', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      type: 'transactional',
      sender: process.env.BREVO_SMS_SENDER || 'Plomberie',
      recipient: destinataire,
      content: contenu,
    }),
  })

  if (!reponse.ok) {
    return { envoye: false, fournisseur: 'brevo', raison: `HTTP ${reponse.status} ${await reponse.text()}` }
  }
  return { envoye: true, fournisseur: 'brevo' }
}

async function envoyerTwilio(destinataire: string, contenu: string): Promise<ResultatSms> {
  const sid = process.env.TWILIO_ACCOUNT_SID!
  const corps = new URLSearchParams({
    To: destinataire,
    From: process.env.TWILIO_FROM!,
    Body: contenu,
  })

  const reponse = await fetchAvecTimeout(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages.json`,
    {
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${sid}:${process.env.TWILIO_AUTH_TOKEN}`)}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: corps.toString(),
    },
  )

  if (!reponse.ok) {
    return { envoye: false, fournisseur: 'twilio', raison: `HTTP ${reponse.status} ${await reponse.text()}` }
  }
  return { envoye: true, fournisseur: 'twilio' }
}

export async function notifierParSms(contenu: string): Promise<ResultatSms> {
  const destinataire = process.env.SMS_TO
  if (!destinataire) {
    return { envoye: false, fournisseur: null, raison: 'SMS_TO non configuré' }
  }

  try {
    if (process.env.BREVO_API_KEY) return await envoyerBrevo(destinataire, contenu)
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM) {
      return await envoyerTwilio(destinataire, contenu)
    }
    return { envoye: false, fournisseur: null, raison: 'aucun fournisseur SMS configuré' }
  } catch (cause) {
    return {
      envoye: false,
      fournisseur: process.env.BREVO_API_KEY ? 'brevo' : 'twilio',
      raison: cause instanceof Error ? cause.message : String(cause),
    }
  }
}
