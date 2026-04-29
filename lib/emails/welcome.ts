import type { City } from '@/lib/cities';

interface WelcomeEmailContent {
  subject: string;
  html: string;
  text: string;
}

export function getWelcomeEmail({ city }: { city: City }): WelcomeEmailContent {
  const locative = city.locative;
  const isPrimary = city.status === 'primary';

  const launchLine = isPrimary
    ? `Damy znać jak uzbieramy 200 osób ${locative}. <strong>Pierwsze 100 osób z waitlisty dostaje 3 miesiące za darmo</strong> — jesteś na dobrej drodze.`
    : `Damy znać jak uzbieramy 200 osób ${locative} — wtedy startujemy. <strong>Pierwsze 100 osób z waitlisty dostaje 3 miesiące za darmo</strong> — jesteś na dobrej drodze.`;

  const launchLineText = isPrimary
    ? `Damy znać jak uzbieramy 200 osób ${locative}. Pierwsze 100 osób z waitlisty dostaje 3 miesiące za darmo — jesteś na dobrej drodze.`
    : `Damy znać jak uzbieramy 200 osób ${locative} — wtedy startujemy. Pierwsze 100 osób z waitlisty dostaje 3 miesiące za darmo — jesteś na dobrej drodze.`;

  const subject = 'Jesteś na liście — RacketUp';

  const html = `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f7f8f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0B1A10;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f8f5;padding:40px 20px;">
  <tr>
    <td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:14px;padding:40px 36px;">
        <tr>
          <td style="padding-bottom:24px;">
            <span style="display:inline-block;width:10px;height:10px;background:#C8FF5E;border-radius:999px;vertical-align:middle;margin-right:10px;"></span><span style="color:#5A6E64;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">RacketUp</span>
          </td>
        </tr>
        <tr>
          <td>
            <h1 style="margin:0 0 24px;color:#0B1A10;font-size:34px;font-weight:800;letter-spacing:-0.6px;line-height:1.08;">Jesteś na liście.</h1>
            <p style="margin:0 0 16px;color:#3a4940;font-size:16px;line-height:1.65;">Cześć — dzięki że zapisałeś się do waitlisty.</p>
            <p style="margin:0 0 16px;color:#3a4940;font-size:16px;line-height:1.65;">${launchLine}</p>
            <p style="margin:0 0 28px;color:#3a4940;font-size:16px;line-height:1.65;">W międzyczasie: jeśli masz pytanie, pomysł, albo chcesz pomóc budować społeczność — odpisz na tego maila albo napisz na <a href="mailto:hello@racketup.pl" style="color:#1C5A3A;text-decoration:underline;">hello@racketup.pl</a>.</p>
            <p style="margin:0 0 6px;color:#0B1A10;font-size:16px;line-height:1.6;">Trzymaj się,<br><strong>Maciek</strong></p>
            <p style="margin:0;color:#5A6E64;font-size:14px;line-height:1.6;">Maciek + Daniel · RacketUp</p>
          </td>
        </tr>
      </table>
      <p style="margin:24px 0 0;color:#8b9690;font-size:12px;line-height:1.5;"><a href="https://racketup.pl" style="color:#8b9690;text-decoration:none;">racketup.pl</a> · <a href="https://racketup.pl/privacy" style="color:#8b9690;text-decoration:underline;">polityka prywatności</a></p>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = `Cześć,

Dzięki że zapisałeś się do waitlisty RacketUp.

${launchLineText}

W międzyczasie: jeśli masz pytanie, pomysł, albo chcesz pomóc budować społeczność — odpisz na tego maila albo napisz na hello@racketup.pl.

Trzymaj się,
Maciek

Maciek + Daniel · RacketUp
racketup.pl · polityka prywatności: https://racketup.pl/privacy`;

  return { subject, html, text };
}
