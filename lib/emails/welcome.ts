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
    ? `Damy znać jak uzbieramy 200 osób ${locative}. Im szybciej zapełnimy listę, tym szybciej startujemy.`
    : `Damy znać jak uzbieramy 200 osób ${locative} — wtedy startujemy w&nbsp;Twoim mieście.`;

  const launchLineText = isPrimary
    ? `Damy znać jak uzbieramy 200 osób ${locative}. Im szybciej zapełnimy listę, tym szybciej startujemy.`
    : `Damy znać jak uzbieramy 200 osób ${locative} — wtedy startujemy w Twoim mieście.`;

  const subject = 'Jesteś na liście — RacketUp';

  const preheader = '3 miesiące za darmo dla pierwszych 100 osób z waitlisty.';

  const fontStack = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif`;

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="pl" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f0f2ed;font-family:${fontStack};">

<div style="display:none;font-size:1px;color:#f0f2ed;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f2ed;">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

        <tr>
          <td style="background:#1C5A3A;padding:30px 36px;">
            <span style="display:inline-block;width:10px;height:10px;background:#C8FF5E;border-radius:999px;vertical-align:middle;margin-right:10px;"></span><span style="color:#C8FF5E;font-family:${fontStack};font-size:13px;letter-spacing:2.5px;text-transform:uppercase;font-weight:700;vertical-align:middle;">RacketUp</span>
          </td>
        </tr>

        <tr>
          <td style="background:#C8FF5E;height:4px;line-height:4px;font-size:0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="padding:44px 40px 8px;">
            <h1 style="margin:0 0 18px;color:#0B1A10;font-family:${fontStack};font-size:36px;font-weight:800;letter-spacing:-0.8px;line-height:1.05;">Jesteś na liście.</h1>
            <p style="margin:0 0 24px;color:#3a4940;font-family:${fontStack};font-size:16px;line-height:1.65;">Cześć — dzięki że zapisałeś się do waitlisty RacketUp.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 40px 28px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f7ed;border-left:3px solid #C8FF5E;border-radius:0 8px 8px 0;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 4px;color:#0B1A10;font-family:${fontStack};font-size:18px;font-weight:700;line-height:1.3;letter-spacing:-0.2px;">3 miesiące za darmo</p>
                  <p style="margin:0;color:#5A6E64;font-family:${fontStack};font-size:14px;line-height:1.5;">Dla pierwszych 100 osób z waitlisty.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:0 40px 28px;">
            <p style="margin:0 0 16px;color:#3a4940;font-family:${fontStack};font-size:16px;line-height:1.65;">${launchLine}</p>
            <p style="margin:0;color:#3a4940;font-family:${fontStack};font-size:16px;line-height:1.65;">Jeśli masz pytanie, pomysł, albo chcesz pomóc budować społeczność — odpisz na tego maila albo napisz na <a href="mailto:hello@racketup.pl" style="color:#1C5A3A;text-decoration:underline;font-weight:600;">hello@racketup.pl</a>.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 40px;">
            <div style="border-top:1px solid #e8ebe4;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 40px 40px;">
            <p style="margin:0 0 8px;color:#0B1A10;font-family:${fontStack};font-size:16px;line-height:1.5;">Trzymaj się,<br><strong style="font-weight:700;">Maciek</strong></p>
            <p style="margin:0;color:#8b9690;font-family:${fontStack};font-size:13px;line-height:1.5;">Maciek + Daniel · founderzy RacketUp</p>
          </td>
        </tr>

      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">
        <tr>
          <td style="padding:24px 16px 8px;text-align:center;">
            <p style="margin:0;color:#8b9690;font-family:${fontStack};font-size:12px;line-height:1.6;">
              <a href="https://racketup.pl" style="color:#5A6E64;text-decoration:none;">racketup.pl</a>
              &nbsp;·&nbsp;
              <a href="https://racketup.pl/privacy" style="color:#5A6E64;text-decoration:underline;">polityka prywatności</a>
            </p>
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>

</body>
</html>`;

  const text = `Cześć,

Dzięki że zapisałeś się do waitlisty RacketUp.

>> 3 miesiące za darmo dla pierwszych 100 osób z waitlisty.

${launchLineText}

Jeśli masz pytanie, pomysł, albo chcesz pomóc budować społeczność — odpisz na tego maila albo napisz na hello@racketup.pl.

Trzymaj się,
Maciek

Maciek + Daniel · founderzy RacketUp
racketup.pl · polityka prywatności: https://racketup.pl/privacy`;

  return { subject, html, text };
}
