import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormEmail } from '../../../emails/ContactFormEmail';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SheMoves Contact <onboarding@resend.dev>', // You can change this to your domain
      to: ['shemoveskigali@gmail.com'], // Your email
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    console.log('Email sent successfully:', data);

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
