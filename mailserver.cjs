// =============================================
//  Contact Form Email Server — Nodemailer
//  Sends form submissions to ahondipto@gmail.com
// =============================================
//
//  SETUP:
//    1. npm install nodemailer
//    2. Fill in your Gmail + App Password below
//    3. node mailserver.js
//
// =============================================

const http = require("http");
const nodemailer = require("nodemailer");

// ✏️  YOUR GMAIL CREDENTIALS
const GMAIL_USER = "ahondipto@gmail.com";
const GMAIL_APP_PASSWORD = "uzta lhbk titx zfez"; // 16-char App Password (NOT your real password)

// ── Nodemailer transporter ────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// ── HTTP Server ───────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/send") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { name, email, message } = JSON.parse(body);

        if (!name || !email || !message) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "All fields are required." }));
          return;
        }

        const mailOptions = {
          from: `"Portfolio Contact" <${GMAIL_USER}>`,
          to: GMAIL_USER,
          replyTo: email,
          subject: `📬 New message from ${name} — Portfolio`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
              <div style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);padding:28px 32px;">
                <h2 style="color:#fff;margin:0;font-size:22px;">New Contact Form Message</h2>
                <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">From your portfolio website</p>
              </div>
              <div style="padding:28px 32px;background:#fff;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;color:#64748b;font-size:13px;width:90px;">NAME</td>
                    <td style="padding:10px 0;color:#0f172a;font-weight:600;">${name}</td>
                  </tr>
                  <tr style="border-top:1px solid #f1f5f9;">
                    <td style="padding:10px 0;color:#64748b;font-size:13px;">EMAIL</td>
                    <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#3b82f6;">${email}</a></td>
                  </tr>
                  <tr style="border-top:1px solid #f1f5f9;">
                    <td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">MESSAGE</td>
                    <td style="padding:10px 0;color:#0f172a;line-height:1.6;">${message.replace(/\n/g, "<br>")}</td>
                  </tr>
                </table>
                <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;font-size:13px;color:#64748b;">
                  💡 Hit <strong>Reply</strong> to respond directly to ${name} at ${email}
                </div>
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`[MAIL] Email sent from ${name} <${email}>`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error("[MAIL] Error:", err.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to send email." }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(5001, () => {
  console.log("✅  Mail server running at http://localhost:5001");
  console.log("📬  Contact form will deliver to ahondipto@gmail.com\n");
});