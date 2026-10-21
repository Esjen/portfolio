import { Resend } from "resend";
import { NextResponse } from "next/server";

import { CONTACT_EMAIL } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Visitor text goes into an HTML email, so escape it before inserting. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New Portfolio Contact from ${String(name).slice(0, 100).replace(/[\r\n]/g, " ")}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">
          <h2 style="color:#2563eb;">📩 New Portfolio Contact</h2>

          <hr />

          <p><strong>Name:</strong> ${escapeHtml(String(name))}</p>

          <p><strong>Email:</strong> ${escapeHtml(String(email))}</p>

          <hr />

          <h3>Message</h3>

          <p style="white-space:pre-wrap;">
            ${escapeHtml(String(message))}
          </p>

          <hr />

          <p style="color:#666;font-size:14px;">
            This message was sent from your portfolio website.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}