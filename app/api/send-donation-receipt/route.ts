import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { DonationReceiptEmail } from '../../../emails/DonationReceiptEmail';
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
    const {
      donorName,
      donorEmail,
      amount,
      currency,
      transactionId,
      message,
    } = await request.json();

    // Validate required fields
    if (!donorName || !donorEmail || !amount || !currency || !transactionId) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Format the date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Render the email template
    const emailHtml = await render(DonationReceiptEmail({
      donorName,
      donorEmail,
      amount,
      currency,
      transactionId,
      message,
      date,
    }));

    // Send receipt email to donor
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'SheMoves <noreply@shemoves.rw>',
        to: donorEmail,
        subject: `Thank You for Your Donation - Receipt #${transactionId}`,
        html: emailHtml,
      });
      console.log('Donation receipt email sent successfully to:', donorEmail);
    } catch (donorError) {
      console.error('Donor email error:', donorError);
      throw new Error('Failed to send donation receipt');
    }

    // Send notification to admin
    try {
      const adminEmailHtml = `
        <h2>New Donation Received!</h2>
        <p><strong>Donor:</strong> ${donorName}</p>
        <p><strong>Email:</strong> ${donorEmail}</p>
        <p><strong>Amount:</strong> ${amount} ${currency.toUpperCase()}</p>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Date:</strong> ${date}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'SheMoves <noreply@shemoves.rw>',
        to: process.env.ADMIN_EMAIL || 'shemoveskigali@gmail.com',
        subject: `New Donation: ${amount} ${currency.toUpperCase()} from ${donorName}`,
        html: adminEmailHtml,
      });
      console.log('Admin notification sent successfully');
    } catch (adminError) {
      console.error('Admin email error:', adminError);
      // Don't fail if admin email fails
    }

    return NextResponse.json(
      { message: 'Donation receipt sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Donation receipt error:', error);
    return NextResponse.json(
      { error: 'Failed to send donation receipt' },
      { status: 500 }
    );
  }
}
