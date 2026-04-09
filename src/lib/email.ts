export interface EmailPayload {
  to: string
  name: string
  businessName: string
  demoUrl: string
}

export async function sendDemoEmail(payload: EmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping email')
    return
  }

  const from = process.env.FROM_EMAIL ?? 'hello@riskfreesites.com'
  const replyTo = process.env.REPLY_TO_EMAIL ?? from

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:Inter,system-ui,sans-serif;background:#f8fafc;margin:0;padding:40px 20px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
    <div style="background:#0ea5e9;padding:40px 40px 32px;">
      <p style="color:#e0f2fe;margin:0 0 8px;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;">Risk Free Sites</p>
      <h1 style="color:#fff;margin:0;font-size:28px;line-height:1.2;">Your website preview is ready</h1>
    </div>
    <div style="padding:40px;">
      <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px;">
        Hi ${payload.name},<br/><br/>
        We've built a personalised demo website for <strong>${payload.businessName}</strong>.
        It's live right now — take a look and let us know what you think.
      </p>
      <a href="${payload.demoUrl}"
         style="display:inline-block;background:#0ea5e9;color:#fff;text-decoration:none;
                padding:16px 32px;border-radius:8px;font-weight:600;font-size:16px;">
        View My Demo Website →
      </a>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:32px 0 0;">
        Like what you see? Reply to this email and we'll talk about building the real thing.<br/><br/>
        — The Risk Free Sites Team
      </p>
    </div>
  </div>
</body>
</html>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      reply_to: replyTo,
      to: [payload.to],
      subject: `Your website preview is ready — ${payload.businessName}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error ${res.status}: ${err}`)
  }
}
