import nodemailer from "nodemailer";
import { site } from "@/data/siteData";

function formatLabel(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHtmlEmail({ formSource, rows }) {
  const rowsHtml = rows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:14px 20px;background:${i % 2 === 0 ? "#fdfbf7" : "#f4efe6"};border-bottom:1px solid #e3dac9;width:38%;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#1c3b2b;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:14px 20px;background:${i % 2 === 0 ? "#fdfbf7" : "#f4efe6"};border-bottom:1px solid #e3dac9;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1e2422;line-height:1.5;">
            ${escapeHtml(value).replace(/\n/g, "<br/>")}
          </td>
        </tr>`,
    )
    .join("");

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#fdfbf7;border:1px solid #e3dac9;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:#1c3b2b;padding:28px 28px 24px;">
              <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#ffffff;letter-spacing:0.3px;">Siddhant School of Yoga</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#b85c00;font-weight:700;">${escapeHtml(formSource)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 24px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9a9284;">
                This submission was sent automatically from the enquiry form on siddhantschoolofyoga.com.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function buildUserConfirmationEmail({ name, course, rows }) {
  const heading = course
    ? `Get Ready For Your ${course} in Rishikesh`
    : "We've Received Your Message!";

  const intro = course
    ? `Dear ${escapeHtml(name)}, we received your application for the <strong>${escapeHtml(course)}</strong>. Our team is reviewing your details, and you can secure your seat right away below.`
    : `Dear ${escapeHtml(name)}, thank you for reaching out to Siddhant School of Yoga. Our team is reviewing your message and will get back to you within 24 hours.`;

  const rowsHtml = rows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:13px 18px;background:${i % 2 === 0 ? "#fdfbf7" : "#f4efe6"};border-bottom:1px solid #e3dac9;width:38%;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#1c3b2b;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:13px 18px;background:${i % 2 === 0 ? "#fdfbf7" : "#f4efe6"};border-bottom:1px solid #e3dac9;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1e2422;line-height:1.5;">
            ${escapeHtml(value).replace(/\n/g, "<br/>")}
          </td>
        </tr>`,
    )
    .join("");

  const paymentUrl = `${site.url}/yoga-course-payment`;
  const whatsappUrl = `https://wa.me/${site.whatsappNumber.replace(/[^\d]/g, "")}`;

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#fdfbf7;border:1px solid #e3dac9;border-radius:12px;overflow:hidden;">
          <tr>
            <td align="center" style="background:#fdfbf7;padding:32px 28px 8px;">
              <img src="${site.url}/logo/siddhant-logo.svg" alt="${escapeHtml(site.name)}" width="180" style="display:block;width:180px;max-width:60%;height:auto;margin:0 auto 20px;" />
              <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#1c3b2b;letter-spacing:0.3px;line-height:1.3;">
                ${escapeHtml(heading)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 24px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#3f4a45;line-height:1.7;text-align:center;">
                ${intro}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e3dac9;border-radius:8px;overflow:hidden;">
                ${rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:28px 28px 12px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:999px;background:#b85c00;">
                    <a href="${paymentUrl}" style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">
                      Pay Advance to Secure Your Seat
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 28px 32px;">
              <a href="${whatsappUrl}" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1c3b2b;text-decoration:underline;">
                Or chat with us directly on WhatsApp
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px;background:#f4efe6;border-top:1px solid #e3dac9;">
              <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7169;line-height:1.6;text-align:center;">
                ${escapeHtml(site.name)} · ${escapeHtml(site.address)}
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7169;line-height:1.6;text-align:center;">
                ${escapeHtml(site.phone)} · ${escapeHtml(site.email)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, formSource, ...rest } = body;

    if (!name || !email) {
      return Response.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // port 465
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const rows = [
      ["Name", name],
      ["Email", email],
      ...Object.entries(rest)
        .filter(([, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => [formatLabel(key), value]),
    ];

    const text = [`Form: ${formSource || "Website Enquiry"}`, ...rows.map(([label, value]) => `${label}: ${value}`)].join("\n");

    const html = buildHtmlEmail({ formSource: formSource || "Website Enquiry", rows });

    await transporter.sendMail({
      from: `"Siddhant School Of Yoga" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: subject || `New enquiry from ${name}`,
      text,
      html,
    });

    // Confirmation email to the applicant — best-effort, never blocks the
    // admin notification above (e.g. a typo'd email address shouldn't fail the request).
    try {
      const course = rest.course;
      const confirmationHtml = buildUserConfirmationEmail({ name, course, rows });
      const confirmationSubject = course
        ? `Get Ready For Your ${course} in Rishikesh`
        : "We've Received Your Message — Siddhant School of Yoga";

      await transporter.sendMail({
        from: `"Siddhant School Of Yoga" <${process.env.SMTP_USER}>`,
        to: email,
        replyTo: process.env.MAIL_TO,
        subject: confirmationSubject,
        html: confirmationHtml,
      });
    } catch (confirmErr) {
      console.error("Confirmation email error:", confirmErr.message);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err.message);
    return Response.json(
      { ok: false, error: "Something went wrong sending your message. Please try again or reach us on WhatsApp." },
      { status: 500 },
    );
  }
}
