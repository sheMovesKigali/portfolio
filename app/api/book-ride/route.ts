import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { BookingConfirmationEmail } from '../../../emails/BookingConfirmationEmail';
import { BookingNotificationEmail } from '../../../emails/BookingNotificationEmail';
import { render } from '@react-email/render';

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const {
      bookingCode,
      rideType,
      pickupLocation,
      dropoffLocation,
      phoneNumber,
      email,
      rideDate,
      rideTime,
      specialRequests,
      estimatedFareRwf,
      estimatedDistanceKm,
    } = await request.json();

    // Validate required fields
    if (!bookingCode || !rideType || !pickupLocation || !dropoffLocation || !phoneNumber) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Render the email templates
    const customerEmailHtml = await render(BookingConfirmationEmail({
      bookingCode,
      rideType,
      pickupLocation,
      dropoffLocation,
      phoneNumber,
      rideDate,
      rideTime,
      specialRequests,
      estimatedFareRwf,
      estimatedDistanceKm,
    }));

    const adminEmailHtml = await render(BookingNotificationEmail({
      bookingCode,
      rideType,
      pickupLocation,
      dropoffLocation,
      phoneNumber,
      rideDate,
      rideTime,
      specialRequests,
      estimatedFareRwf,
      estimatedDistanceKm,
    }));

    // Send confirmation email to customer (if email provided)
    if (email) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'SheMoves <noreply@shemoves.rw>',
          to: email,
          subject: `Booking Confirmed - ${bookingCode}`,
          html: customerEmailHtml,
        });
        console.log('Customer confirmation email sent successfully');
      } catch (customerError) {
        console.error('Customer email error:', customerError);
        // Don't fail the request if customer email fails
      }
    }

    // Send notification email to admin
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'SheMoves <noreply@shemoves.rw>',
        to: process.env.ADMIN_EMAIL || 'shemoveskigali@gmail.com',
        subject: `New Ride Booking - ${bookingCode} (${rideType})`,
        html: adminEmailHtml,
      });
      console.log('Admin notification email sent successfully');
    } catch (adminError) {
      console.error('Admin email error:', adminError);
      throw new Error('Failed to send booking notification');
    }

    console.log('Booking emails sent successfully');

    return NextResponse.json(
      {
        message: 'Booking confirmed and emails sent successfully!',
        bookingCode
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Booking submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}
