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

interface DriverApplicationEmailProps {
    name: string;
    phone: string;
    email: string;
    vehicle?: string;
}

export const DriverApplicationEmail = ({
    name,
    phone,
    email,
    vehicle,
}: DriverApplicationEmailProps) => (
    <Html>
        <Head />
        <Preview>New driver application from {name}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Heading style={h1}>SheMoves</Heading>
                    <Text style={subtitle}>Safe rides for women in Kigali</Text>
                </Section>

                <Section style={content}>
                    <Heading style={h2}>🚗 New Driver Application</Heading>

                    <Section style={infoBox}>
                        <Text style={label}>Applicant Name:</Text>
                        <Text style={value}>{name}</Text>

                        <Text style={label}>Phone Number:</Text>
                        <Text style={value}>{phone}</Text>

                        <Text style={label}>Email Address:</Text>
                        <Text style={value}>{email}</Text>

                        <Text style={label}>Vehicle Information:</Text>
                        <Text style={value}>{vehicle || 'Not provided'}</Text>
                    </Section>

                    <Section style={nextStepsBox}>
                        <Heading style={h3}>📋 Next Steps</Heading>
                        <Text style={stepText}>1. Review application details above</Text>
                        <Text style={stepText}>2. Contact applicant for initial screening call</Text>
                        <Text style={stepText}>3. Schedule background check and documentation review</Text>
                        <Text style={stepText}>4. Arrange defensive driving training session</Text>
                        <Text style={stepText}>5. Complete vehicle inspection and approval</Text>
                    </Section>

                    <Section style={priorityBox}>
                        <Text style={priorityText}>
                            ⚡ <strong>Priority:</strong> New driver applications should be processed within 24-48 hours
                        </Text>
                    </Section>
                </Section>

                <Hr style={hr} />

                <Section style={footer}>
                    <Text style={footerText}>
                        This application was submitted through the SheMoves website driver application form.
                    </Text>
                    <Text style={footerText}>
                        Contact the applicant directly at {phone} or {email} to begin the onboarding process.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

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

const infoBox = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
};

const nextStepsBox = {
    backgroundColor: '#e8f5e8',
    border: '1px solid #c3e6c3',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
};

const priorityBox = {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
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

const stepText = {
    color: '#2d5a2d',
    fontSize: '15px',
    margin: '0 0 8px',
    lineHeight: '1.5',
};

const priorityText = {
    color: '#856404',
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

export default DriverApplicationEmail;
