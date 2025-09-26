import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { DriverApplicationEmail } from '../../../emails/DriverApplicationEmail';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SheMoves Applications <onboarding@resend.dev>', // You can change this to your domain
      to: ['shemoveskigali@gmail.com'], // Your email
      subject: `New Driver Application from ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    console.log('Email sent successfully:', data);

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
