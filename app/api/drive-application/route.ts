import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { DriverApplicationEmail } from '../../../emails/DriverApplicationEmail';
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
    const { name, phone, email, vehicle } = await request.json();

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, phone, and email are required' },
        { status: 400 }
      );
    }

    // Render the email template
    const emailHtml = await render(DriverApplicationEmail({ name, phone, email, vehicle }));

    // Send email using SMTP
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'SheMoves Applications <noreply@shemoves.rw>',
      to: process.env.ADMIN_EMAIL || 'shemoveskigali@gmail.com',
      replyTo: email, // Allow admin to reply directly to the applicant
      subject: `New Driver Application from ${name}`,
      html: emailHtml,
    });

    console.log('Driver application email sent successfully');

    return NextResponse.json(
      { message: 'Application submitted successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Driver application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
