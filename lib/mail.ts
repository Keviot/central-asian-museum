/**
 * Brevo (Sendinblue) Transactional Email Service
 * 
 * Implements requirement #57:
 * When an enquiry is submitted through the Contact form:
 * 1. Visitor receives an acknowledgement email confirming their message.
 * 2. Chief Curator / Museum receives a notification email with enquiry details,
 *    category badge color, direct reply link to sender, and quick link to CMS Leads.
 */

interface ContactEmailParams {
  name: string;
  email: string;
  intent: string;
  subject?: string;
  message: string;
}

interface CategoryMeta {
  label: string;
  pillLabel: string;
  ackPhrase: string;
  color: string;
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  visits: {
    label: "Group, school or college visit",
    pillLabel: "Group / School Visit",
    ackPhrase: "a group, school or college visit",
    color: "#1c3f5e",
  },
  research: {
    label: "Research access",
    pillLabel: "Research Access",
    ackPhrase: "research access",
    color: "#2d5038",
  },
  donation: {
    label: "Donation",
    pillLabel: "Donation",
    ackPhrase: "a donation",
    color: "#8a6a12",
  },
  general: {
    label: "General enquiry",
    pillLabel: "General Enquiry",
    ackPhrase: "a general enquiry",
    color: "#54333b",
  },
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getISTDateFormats(date: Date = new Date()) {
  const dateFormatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const timeFormatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .toLowerCase();

  return {
    date: dateFormatted,
    datetime: `${dateFormatted} at ${timeFormatted} IST`,
  };
}

async function sendBrevoEmail(payload: {
  sender: { name: string; email: string };
  to: { name: string; email: string }[];
  replyTo?: { name: string; email: string };
  subject: string;
  htmlContent: string;
  textContent: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn("[mail] BREVO_API_KEY is not defined, skipping email sending.");
    return null;
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Brevo send failed (${res.status}): ${errText}`);
  }

  return res.json();
}

/**
 * Sends both visitor acknowledgement and museum notification emails.
 * Never throws an uncaught error to prevent losing lead data.
 */
export async function sendContactEmails(params: ContactEmailParams) {
  const { name, email, intent, message } = params;

  const trimmedName = name.trim();
  const firstName = trimmedName.split(/\s+/)[0] || trimmedName;
  const trimmedEmail = email.trim().toLowerCase();
  const cleanMessage = message.trim();

  const key = intent?.toLowerCase() || "general";
  const cat = CATEGORY_MAP[key] || CATEGORY_MAP.general;

  const { date, datetime } = getISTDateFormats(new Date());

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://central-asian-museum.vercel.app";
  const logoUrl = appUrl.includes("localhost")
    ? "https://central-asian-museum.vercel.app/images/logo/cam-logo-dark.png"
    : `${appUrl}/images/logo/cam-logo-dark.png`;
  const leadsUrl = `${appUrl}/admin/leads`;

  const senderEmail = process.env.BREVO_SENDER_EMAIL || "centralasianmuseum26@gmail.com";
  const museumEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "centralasianmuseum26@gmail.com";

  // 1. Visitor Acknowledgement Email HTML & Text
  const ackHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>We've received your message</title>
</head>
<body style="margin:0;padding:0;background:#f3efe8;">
<div style="display:none;max-height:0;overflow:hidden;">Thank you for writing to the Central Asian Museum, Leh. We have received your message.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3efe8;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e3d9c8;border-radius:4px;">
      <tr><td align="center" style="background:#54333f;padding:28px 24px;border-radius:4px 4px 0 0;">
        <img src="${logoUrl}" width="72" height="70" alt="Central Asian Museum, Leh" style="display:block;border:0;">
      </td></tr>
      <tr><td style="padding:36px 36px 8px;font-family:Georgia,'Times New Roman',serif;color:#26171c;">
        <h1 style="margin:0 0 18px;font-size:26px;line-height:1.25;font-weight:normal;">Thank you, ${escapeHtml(firstName)}</h1>
        <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#4f393f;">
          We have received your message about <strong style="color:#26171c;">${escapeHtml(cat.ackPhrase)}</strong>, sent on ${date}.
          A member of the museum team will read it and reply to you as soon as possible.
        </p>
        <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#d28541;font-weight:bold;">Your message</p>
        <div style="margin:0 0 24px;padding:14px 16px;background:#faf8f5;border-left:3px solid #d28541;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#4f393f;white-space:pre-line;">${escapeHtml(cleanMessage)}</div>
        <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#4f393f;">
          If you need to add anything, simply reply to this email.
        </p>
      </td></tr>
      <tr><td style="padding:0 36px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e3d9c8;">
          <tr><td style="padding-top:20px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:#6b5a5f;">
            <strong style="color:#26171c;">Central Asian Museum, Leh</strong><br>
            Tsas Soma, Main Market, Leh, Ladakh 194101<br>
            Summer (May to October): 10 am to 6 pm · Winter: 10 am to 5 pm<br>
            Phone: <a href="tel:+919596919597" style="color:#54333f;">+91 95969 19597</a> ·
            Instagram: <a href="https://www.instagram.com/centralasianmuseum_leh/" style="color:#54333f;">@centralasianmuseum_leh</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
    <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a7a75;">This is an automatic confirmation that your message reached us.</p>
  </td></tr>
</table>
</body>
</html>`;

  const ackText = `Thank you, ${firstName}

We have received your message about ${cat.ackPhrase}, sent on ${date}. A member of the museum team will read it and reply to you as soon as possible.

Your message:
${cleanMessage}

If you need to add anything, simply reply to this email.

--
Central Asian Museum, Leh
Tsas Soma, Main Market, Leh, Ladakh 194101
Summer (May to October): 10 am to 6 pm · Winter: 10 am to 5 pm
Phone: +91 95969 19597 · Instagram: @centralasianmuseum_leh

This is an automatic confirmation that your message reached us.`;

  // 2. Chief Curator Notification Email HTML & Text
  const notifHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>New enquiry from the website</title>
</head>
<body style="margin:0;padding:0;background:#f3efe8;">
<div style="display:none;max-height:0;overflow:hidden;">New ${escapeHtml(cat.pillLabel)} enquiry from ${escapeHtml(trimmedName)}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3efe8;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e3d9c8;border-radius:4px;">
      <tr><td style="background:#54333f;padding:20px 28px;border-radius:4px 4px 0 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td width="56" style="vertical-align:middle;"><img src="${logoUrl}" width="48" height="47" alt="" style="display:block;border:0;"></td>
          <td style="vertical-align:middle;padding-left:14px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#d6c9b3;">Curatorial CMS · New lead</td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:32px 32px 8px;font-family:Georgia,'Times New Roman',serif;color:#26171c;">
        <h1 style="margin:0 0 6px;font-size:24px;line-height:1.3;font-weight:normal;">New message from ${escapeHtml(trimmedName)}</h1>
        <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#6b5a5f;">Received through the website's Contact form on ${datetime}.</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;border:1px solid #e3d9c8;border-radius:3px;">
          <tr><td style="padding:10px 14px;width:110px;color:#d28541;font-size:11px;font-weight:bold;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid #efe7da;">Name</td>
              <td style="padding:10px 14px;color:#26171c;border-bottom:1px solid #efe7da;">${escapeHtml(trimmedName)}</td></tr>
          <tr><td style="padding:10px 14px;color:#d28541;font-size:11px;font-weight:bold;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid #efe7da;">Email</td>
              <td style="padding:10px 14px;border-bottom:1px solid #efe7da;"><a href="mailto:${escapeHtml(trimmedEmail)}" style="color:#35638f;">${escapeHtml(trimmedEmail)}</a></td></tr>
          <tr><td style="padding:10px 14px;color:#d28541;font-size:11px;font-weight:bold;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid #efe7da;">Subject</td>
              <td style="padding:10px 14px;border-bottom:1px solid #efe7da;"><span style="display:inline-block;padding:2px 8px;border-radius:3px;background:${cat.color};color:#ffffff;font-size:12px;font-weight:bold;">${escapeHtml(cat.pillLabel)}</span></td></tr>
          <tr><td style="padding:10px 14px;color:#d28541;font-size:11px;font-weight:bold;letter-spacing:.14em;text-transform:uppercase;">Received</td>
              <td style="padding:10px 14px;color:#26171c;">${datetime}</td></tr>
        </table>
        <p style="margin:24px 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#d28541;font-weight:bold;">Message</p>
        <div style="margin:0 0 26px;padding:14px 16px;background:#faf8f5;border-left:3px solid #d28541;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:#26171c;white-space:pre-line;">${escapeHtml(cleanMessage)}</div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;"><tr>
          <td style="background:#54333f;border-radius:3px;"><a href="mailto:${escapeHtml(trimmedEmail)}" style="display:inline-block;padding:11px 20px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#ffffff;text-decoration:none;">Reply to ${escapeHtml(firstName)}</a></td>
          <td style="width:10px;"></td>
          <td style="border:1px solid #d6c9b3;border-radius:3px;"><a href="${leadsUrl}" style="display:inline-block;padding:10px 18px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;color:#54333f;text-decoration:none;">Open in Leads</a></td>
        </tr></table>
      </td></tr>
    </table>
    <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a7a75;">Sent automatically by the Central Asian Museum website. The sender has received an acknowledgement email.</p>
  </td></tr>
</table>
</body>
</html>`;

  const notifText = `New message from ${trimmedName}
Received through the website's Contact form on ${datetime}.

Name:     ${trimmedName}
Email:    ${trimmedEmail}
Subject:  ${cat.pillLabel}
Received: ${datetime}

Message:
${cleanMessage}

Reply: mailto:${trimmedEmail}
Open in Leads: ${leadsUrl}

--
Sent automatically by the Central Asian Museum website. The sender has received an acknowledgement email.`;

  // Dispatch both emails in parallel via Brevo
  const results = await Promise.allSettled([
    // 1. Acknowledgement to visitor
    sendBrevoEmail({
      sender: {
        name: "Central Asian Museum, Leh",
        email: senderEmail,
      },
      to: [{ name: trimmedName, email: trimmedEmail }],
      replyTo: {
        name: "Central Asian Museum, Leh",
        email: senderEmail,
      },
      subject: "We've received your message · Central Asian Museum, Leh",
      htmlContent: ackHtml,
      textContent: ackText,
    }),

    // 2. Notification to Chief Curator
    sendBrevoEmail({
      sender: {
        name: "Central Asian Museum website",
        email: senderEmail,
      },
      to: [{ name: "Chief Curator", email: museumEmail }],
      replyTo: {
        name: trimmedName,
        email: trimmedEmail,
      },
      subject: `New enquiry: ${cat.pillLabel} · ${trimmedName}`,
      htmlContent: notifHtml,
      textContent: notifText,
    }),
  ]);

  results.forEach((res, idx) => {
    const target = idx === 0 ? "Visitor acknowledgement" : "Curator notification";
    if (res.status === "fulfilled") {
      console.log(`[mail] ${target} sent successfully:`, res.value);
    } else {
      console.error(`[mail] ${target} failed to send:`, res.reason);
    }
  });

  return results;
}
