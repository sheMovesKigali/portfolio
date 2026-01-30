import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Hr,
} from '@react-email/components';
import * as React from 'react';

interface BookingConfirmationEmailProps {
    bookingCode: string;
    rideType: string;
    pickupLocation: string;
    dropoffLocation: string;
    phoneNumber: string;
    rideDate?: string;
    rideTime?: string;
    specialRequests?: string;
    estimatedFareRwf?: number;
    estimatedDistanceKm?: number;
}

export const BookingConfirmationEmail = ({
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
}: BookingConfirmationEmailProps) => {
    const rideTypeLabels: { [key: string]: string } = {
        standard: 'Standard Ride',
        wellness: 'Wellness Ride (Private & Confidential)',
        scheduled: 'Scheduled Ride',
    };

    return (
        <Html>
            <Head />
            <Preview>Your SheMoves booking is confirmed - Code: {bookingCode}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={h1}>SheMoves</Heading>
                        <Text style={subtitle}>Safe rides for women in Kigali</Text>
                    </Section>

                    <Section style={content}>
                        <div style={successBadge}>
                            <Text style={successIcon}>✓</Text>
                        </div>
                        <Heading style={h2}>Booking Confirmed!</Heading>

                        <Section style={codeBox}>
                            <Text style={codeLabel}>Your Booking Code</Text>
                            <Text style={codeText}>{bookingCode}</Text>
                            <Text style={codeInstruction}>
                                Show this code to your driver
                            </Text>
                        </Section>

                        <Section style={infoBox}>
                            <Text style={label}>Ride Type:</Text>
                            <Text style={value}>{rideTypeLabels[rideType] || rideType}</Text>

                            <Text style={label}>Pickup Location:</Text>
                            <Text style={value}>{pickupLocation}</Text>

                            <Text style={label}>Dropoff Location:</Text>
                            <Text style={value}>{dropoffLocation}</Text>

                            {rideDate && (
                                <>
                                    <Text style={label}>Date:</Text>
                                    <Text style={value}>{rideDate}</Text>
                                </>
                            )}

                            {rideTime && (
                                <>
                                    <Text style={label}>Time:</Text>
                                    <Text style={value}>{rideTime}</Text>
                                </>
                            )}

                            <Text style={label}>Contact Number:</Text>
                            <Text style={value}>{phoneNumber}</Text>

                            {estimatedFareRwf != null && (
                                <>
                                    <Text style={label}>Estimated Fare:</Text>
                                    <Text style={value}>
                                        {estimatedFareRwf.toLocaleString()} RWF
                                        {estimatedDistanceKm != null && ` (~${estimatedDistanceKm} km · 2,000 RWF first km, then 1,500 RWF/km)`}
                                    </Text>
                                </>
                            )}

                            {specialRequests && (
                                <>
                                    <Text style={label}>Special Requests:</Text>
                                    <Text style={value}>{specialRequests}</Text>
                                </>
                            )}
                        </Section>

                        {rideType === 'wellness' && (
                            <Section style={privacyBox}>
                                <Text style={privacyText}>
                                    🛡️ <strong>Privacy Protected:</strong> Your wellness ride details are completely confidential. Only share your booking code with your assigned driver.
                                </Text>
                            </Section>
                        )}

                        <Section style={nextStepsBox}>
                            <Heading style={h3}>What Happens Next?</Heading>
                            <Text style={stepText}>✓ A driver will be matched to your booking within 5 minutes</Text>
                            <Text style={stepText}>✓ You'll receive an SMS with driver details</Text>
                            <Text style={stepText}>✓ Your driver will contact you shortly</Text>
                            <Text style={stepText}>✓ Have your booking code ready</Text>
                        </Section>

                        <Section style={thankYouBox}>
                            <Heading style={h3}>Thank You! 💛</Heading>
                            <Text style={thankYouText}>
                                Thank you for choosing SheMoves. We're honored to serve you with safe, reliable transportation.
                                Your trust in our women drivers helps empower more women in Kigali's transportation industry.
                            </Text>
                            <Text style={thankYouText}>
                                We hope you have a comfortable and safe journey!
                            </Text>
                        </Section>
                    </Section>

                    <Hr style={hr} />

                    <Section style={footer}>
                        <Text style={footerText}>
                            SheMoves - Safe rides for women in Kigali
                        </Text>
                        <Text style={footerText}>
                            Need help? Contact us 24/7 at support@shemoves.rw
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '600px',
};

const header = {
    padding: '32px 24px 0',
    textAlign: 'center' as const,
};

const h1 = {
    color: '#000000',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
};

const subtitle = {
    color: '#666666',
    fontSize: '16px',
    margin: '8px 0 0',
};

const content = {
    padding: '32px 24px',
};

const successBadge = {
    textAlign: 'center' as const,
    marginBottom: '16px',
};

const successIcon = {
    display: 'inline-block',
    width: '60px',
    height: '60px',
    backgroundColor: '#10b981',
    color: '#ffffff',
    fontSize: '36px',
    fontWeight: 'bold',
    lineHeight: '60px',
    borderRadius: '50%',
    margin: '0',
};

const h2 = {
    color: '#000000',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 24px',
    textAlign: 'center' as const,
};

const h3 = {
    color: '#000000',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 16px',
};

const codeBox = {
    backgroundColor: '#1a1a1a',
    border: '2px solid #f59e0b',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    textAlign: 'center' as const,
};

const codeLabel = {
    color: '#d1d5db',
    fontSize: '14px',
    margin: '0 0 8px',
};

const codeText = {
    color: '#f59e0b',
    fontSize: '32px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: '2px',
    margin: '0 0 8px',
};

const codeInstruction = {
    color: '#9ca3af',
    fontSize: '12px',
    margin: '0',
};

const infoBox = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
};

const privacyBox = {
    backgroundColor: '#fef3c7',
    border: '1px solid #fbbf24',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    textAlign: 'center' as const,
};

const privacyText = {
    color: '#92400e',
    fontSize: '14px',
    margin: '0',
    lineHeight: '1.5',
};

const nextStepsBox = {
    backgroundColor: '#ecfdf5',
    border: '1px solid #a7f3d0',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
};

const thankYouBox = {
    backgroundColor: '#fffbeb',
    border: '2px solid #fbbf24',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center' as const,
};

const thankYouText = {
    color: '#78350f',
    fontSize: '15px',
    margin: '0 0 12px',
    lineHeight: '1.6',
};

const label = {
    color: '#495057',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 0 4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
};

const value = {
    color: '#000000',
    fontSize: '16px',
    margin: '0 0 16px',
    lineHeight: '1.5',
};

const stepText = {
    color: '#065f46',
    fontSize: '15px',
    margin: '0 0 8px',
    lineHeight: '1.5',
};

const hr = {
    borderColor: '#e9ecef',
    margin: '32px 0',
};

const footer = {
    padding: '0 24px',
    textAlign: 'center' as const,
};

const footerText = {
    color: '#6c757d',
    fontSize: '14px',
    margin: '0 0 8px',
    lineHeight: '1.5',
};

export default BookingConfirmationEmail;
