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

interface DonationReceiptEmailProps {
    donorName: string;
    amount: number;
    currency: string;
    transactionId: string;
    donorEmail: string;
    message?: string;
    date: string;
}

export const DonationReceiptEmail = ({
    donorName,
    amount,
    currency,
    transactionId,
    donorEmail,
    message,
    date,
}: DonationReceiptEmailProps) => {
    const currencySymbols: Record<string, string> = {
        rwf: 'RWF',
        usd: '$',
        eur: '€',
    };

    const formatAmount = (amt: number, curr: string) => {
        const symbol = currencySymbols[curr.toLowerCase()] || curr.toUpperCase();
        if (curr.toLowerCase() === 'rwf') {
            return `${amt.toLocaleString()} ${symbol}`;
        }
        return `${symbol}${amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <Html>
            <Head />
            <Preview>Thank you for your donation to SheMoves - Receipt #{transactionId}</Preview>
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
                        <Heading style={h2}>Thank You for Your Donation!</Heading>

                        <Section style={receiptBox}>
                            <Text style={receiptTitle}>DONATION RECEIPT</Text>
                            <Text style={receiptId}>Receipt #{transactionId}</Text>
                        </Section>

                        <Section style={infoBox}>
                            <Text style={label}>Donor Name:</Text>
                            <Text style={value}>{donorName}</Text>

                            <Text style={label}>Email:</Text>
                            <Text style={value}>{donorEmail}</Text>

                            <Text style={label}>Donation Amount:</Text>
                            <Text style={amountValue}>{formatAmount(amount, currency)}</Text>

                            <Text style={label}>Transaction ID:</Text>
                            <Text style={value}>{transactionId}</Text>

                            <Text style={label}>Date:</Text>
                            <Text style={value}>{date}</Text>

                            {message && (
                                <>
                                    <Text style={label}>Your Message:</Text>
                                    <Text style={value}>{message}</Text>
                                </>
                            )}
                        </Section>

                        <Section style={impactBox}>
                            <Heading style={h3}>Your Impact 🌟</Heading>
                            <Text style={impactText}>
                                Your generous donation of {formatAmount(amount, currency)} will directly support:
                            </Text>
                            <Text style={impactItem}>• Training and certification programs for women drivers</Text>
                            <Text style={impactItem}>• Safety equipment and vehicle maintenance</Text>
                            <Text style={impactItem}>• Financial assistance for women entering the industry</Text>
                            <Text style={impactItem}>• Building a safer transportation ecosystem in Kigali</Text>
                        </Section>

                        <Section style={thankYouBox}>
                            <Heading style={h3}>Thank You! 💛</Heading>
                            <Text style={thankYouText}>
                                We are deeply grateful for your support. Your contribution makes a real difference in empowering
                                women drivers and creating safer transportation options in Kigali.
                            </Text>
                            <Text style={thankYouText}>
                                Together, we're building a more inclusive and equitable transportation industry.
                            </Text>
                        </Section>

                        <Section style={taxBox}>
                            <Text style={taxText}>
                                📄 <strong>Tax Deductibility:</strong> SheMoves is a registered organization.
                                This receipt may be used for tax purposes where applicable. Please consult your tax advisor.
                            </Text>
                        </Section>
                    </Section>

                    <Hr style={hr} />

                    <Section style={footer}>
                        <Text style={footerText}>
                            SheMoves - Safe rides for women in Kigali
                        </Text>
                        <Text style={footerText}>
                            Questions about your donation? Contact us at support@shemoves.rw
                        </Text>
                        <Text style={footerText}>
                            Keep this receipt for your records.
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

const receiptBox = {
    backgroundColor: '#1a1a1a',
    border: '2px solid #f59e0b',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    textAlign: 'center' as const,
};

const receiptTitle = {
    color: '#d1d5db',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    margin: '0 0 8px',
};

const receiptId = {
    color: '#f59e0b',
    fontSize: '14px',
    fontFamily: 'monospace',
    margin: '0',
};

const infoBox = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
};

const impactBox = {
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
    marginBottom: '20px',
    textAlign: 'center' as const,
};

const taxBox = {
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
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

const amountValue = {
    color: '#059669',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 16px',
    lineHeight: '1.5',
};

const impactText = {
    color: '#065f46',
    fontSize: '15px',
    margin: '0 0 12px',
    lineHeight: '1.5',
};

const impactItem = {
    color: '#065f46',
    fontSize: '14px',
    margin: '0 0 8px',
    lineHeight: '1.5',
};

const thankYouText = {
    color: '#78350f',
    fontSize: '15px',
    margin: '0 0 12px',
    lineHeight: '1.6',
};

const taxText = {
    color: '#075985',
    fontSize: '13px',
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

export default DonationReceiptEmail;
