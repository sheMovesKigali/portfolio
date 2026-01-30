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

interface BookingNotificationEmailProps {
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

export const BookingNotificationEmail = ({
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
}: BookingNotificationEmailProps) => {
    const rideTypeLabels: { [key: string]: string } = {
        standard: 'Standard Ride',
        wellness: 'Wellness Ride (Private & Confidential)',
        scheduled: 'Scheduled Ride',
    };

    const urgencyLevel = rideType === 'scheduled' ? 'Normal' : 'Immediate';
    const isWellness = rideType === 'wellness';

    return (
        <Html>
            <Head />
            <Preview>New ride booking - Code: {bookingCode}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={h1}>SheMoves</Heading>
                        <Text style={subtitle}>Safe rides for women in Kigali</Text>
                    </Section>

                    <Section style={content}>
                        <Heading style={h2}>🚗 New Ride Booking</Heading>

                        <Section style={urgencyBox}>
                            <Text style={urgencyText}>
                                ⚡ <strong>Urgency:</strong> {urgencyLevel}
                                {urgencyLevel === 'Immediate' && ' - Assign driver within 5 minutes'}
                            </Text>
                        </Section>

                        {isWellness && (
                            <Section style={privacyNoticeBox}>
                                <Text style={privacyNoticeText}>
                                    🛡️ <strong>CONFIDENTIAL WELLNESS RIDE</strong> - Handle with discretion. Destination and purpose are private.
                                </Text>
                            </Section>
                        )}

                        <Section style={bookingCodeBox}>
                            <Text style={codeLabel}>Booking Code</Text>
                            <Text style={codeText}>{bookingCode}</Text>
                        </Section>

                        <Section style={infoBox}>
                            <Text style={label}>Ride Type:</Text>
                            <Text style={value}>{rideTypeLabels[rideType] || rideType}</Text>

                            <Text style={label}>Customer Phone:</Text>
                            <Text style={value}>{phoneNumber}</Text>

                            <Text style={label}>Pickup Location:</Text>
                            <Text style={value}>{pickupLocation}</Text>

                            <Text style={label}>Dropoff Location:</Text>
                            <Text style={value}>{dropoffLocation}</Text>

                            {rideDate && (
                                <>
                                    <Text style={label}>Scheduled Date:</Text>
                                    <Text style={value}>{rideDate}</Text>
                                </>
                            )}

                            {rideTime && (
                                <>
                                    <Text style={label}>Scheduled Time:</Text>
                                    <Text style={value}>{rideTime}</Text>
                                </>
                            )}

                            {estimatedFareRwf != null && (
                                <>
                                    <Text style={label}>Estimated Fare:</Text>
                                    <Text style={value}>
                                        {estimatedFareRwf.toLocaleString()} RWF
                                        {estimatedDistanceKm != null && ` (~${estimatedDistanceKm} km)`}
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

                        <Section style={actionBox}>
                            <Heading style={h3}>📋 Action Items</Heading>
                            <Text style={actionText}>1. Assign available driver immediately</Text>
                            <Text style={actionText}>2. Send driver details to customer via SMS</Text>
                            <Text style={actionText}>3. Notify driver with booking code and customer contact</Text>
                            <Text style={actionText}>4. Monitor ride status and customer satisfaction</Text>
                            {isWellness && (
                                <Text style={actionText}>5. ⚠️ Ensure driver maintains strict confidentiality</Text>
                            )}
                        </Section>

                        <Section style={timelineBox}>
                            <Text style={timelineText}>
                                ⏰ <strong>Expected Timeline:</strong> Customer expects driver contact within 5 minutes
                            </Text>
                        </Section>
                    </Section>

                    <Hr style={hr} />

                    <Section style={footer}>
                        <Text style={footerText}>
                            This booking was submitted through the SheMoves website booking form.
                        </Text>
                        <Text style={footerText}>
                            Contact customer at {phoneNumber} to confirm driver assignment.
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

const h2 = {
    color: '#000000',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 24px',
};

const h3 = {
    color: '#000000',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 16px',
};

const urgencyBox = {
    backgroundColor: '#fee2e2',
    border: '2px solid #ef4444',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    textAlign: 'center' as const,
};

const urgencyText = {
    color: '#991b1b',
    fontSize: '15px',
    margin: '0',
    lineHeight: '1.5',
};

const privacyNoticeBox = {
    backgroundColor: '#fef3c7',
    border: '2px solid #f59e0b',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    textAlign: 'center' as const,
};

const privacyNoticeText = {
    color: '#92400e',
    fontSize: '15px',
    margin: '0',
    lineHeight: '1.5',
};

const bookingCodeBox = {
    backgroundColor: '#1a1a1a',
    border: '2px solid #f59e0b',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
    textAlign: 'center' as const,
};

const codeLabel = {
    color: '#d1d5db',
    fontSize: '14px',
    margin: '0 0 8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const codeText = {
    color: '#f59e0b',
    fontSize: '28px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: '2px',
    margin: '0',
};

const infoBox = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
};

const actionBox = {
    backgroundColor: '#e0f2fe',
    border: '1px solid #7dd3fc',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
};

const timelineBox = {
    backgroundColor: '#f0fdf4',
    border: '1px solid #86efac',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center' as const,
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

const actionText = {
    color: '#075985',
    fontSize: '15px',
    margin: '0 0 8px',
    lineHeight: '1.5',
};

const timelineText = {
    color: '#14532d',
    fontSize: '14px',
    margin: '0',
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

export default BookingNotificationEmail;
