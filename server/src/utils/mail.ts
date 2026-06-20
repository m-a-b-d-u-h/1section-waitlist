import nodemailer from "nodemailer"
import { config } from "../config"

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
})

export async function sendConfirmationEmail(
  to: string,
  name: string | null,
  position: number
) {
  if (!config.smtp.user) return

  const displayName = name || "friend"

  try {
    await transporter.sendMail({
      from: config.smtp.from,
      to,
      subject: "You're on the waitlist, welcome to 1section!",
      html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#000;color:#fff">
        <div style="text-align:center;margin-bottom:32px">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:white;color:black;font-weight:900;font-size:18px;margin-bottom:8px">S</div>
          <h1 style="font-size:28px;font-weight:900;margin:0;letter-spacing:-0.03em">1section</h1>
        </div>
        <h2 style="font-size:22px;font-weight:700;margin-bottom:8px">You're in, ${displayName}!</h2>
        <p style="color:#a3a3a3;line-height:1.6;margin-bottom:24px">Thanks for joining the 1section waitlist. You're <strong style="color:white">#${position}</strong> in line. We'll notify you as soon as we launch.</p>
        <div style="background:#0a0a0a;border:1px solid #1a1a1a;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center">
          <p style="font-size:14px;color:#737373;margin:0">Your position</p>
          <p style="font-size:48px;font-weight:900;margin:4px 0;color:white">#${position}</p>
        </div>
        <p style="color:#525252;font-size:13px;text-align:center">In the meantime, tell your friends about 1section.</p>
        <div style="text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid #1a1a1a;font-size:12px;color:#525252">
          © ${new Date().getFullYear()} 1section. All rights reserved.
        </div>
      </div>`,
    })
  } catch (err) {
    console.error("[Mail] Failed to send confirmation:", err)
  }
}
