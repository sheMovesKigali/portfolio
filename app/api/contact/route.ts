import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactFormEmail } from '../../../emails/ContactFormEmail';
import { render } from '@react-email/render';

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Render the email template
    const emailHtml = await render(ContactFormEmail({ name, email, message }));

    // Send email using SMTP
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'SheMoves Contact <noreply@shemoves.rw>',
      to: process.env.ADMIN_EMAIL || 'shemoveskigali@gmail.com',
      replyTo: email, // Allow admin to reply directly to the sender
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
    });

    console.log('Contact email sent successfully');

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
