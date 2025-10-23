// api/send-email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await resend.emails.send({
      from: "Xshh Portfolio <noreply@yourdomain.com>",
      to: "aloysiussandyhermawan@gmail.com",
      subject: `New contact from ${name}`,
      html: `
        <h2>New message from portfolio contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("send-email error:", err);
    return res.status(500).json({ error: err?.message || "Failed to send" });
  }
}
