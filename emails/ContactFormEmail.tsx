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

interface ContactFormEmailProps {
    name: string;
    email: string;
    message: string;
}

export const ContactFormEmail = ({
    name,
    email,
    message,
}: ContactFormEmailProps) => (
    <Html>
        <Head />
        <Preview>New contact form submission from {name}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Heading style={h1}>SheMoves</Heading>
                    <Text style={subtitle}>Safe rides for women in Kigali</Text>
                </Section>

                <Section style={content}>
                    <Heading style={h2}>New Contact Form Submission</Heading>

                    <Section style={infoBox}>
                        <Text style={label}>Name:</Text>
                        <Text style={value}>{name}</Text>

                        <Text style={label}>Email:</Text>
                        <Text style={value}>{email}</Text>
                    </Section>

                    <Section style={messageBox}>
                        <Text style={label}>Message:</Text>
                        <Text style={messageText}>{message}</Text>
                    </Section>
                </Section>

                <Hr style={hr} />

                <Section style={footer}>
                    <Text style={footerText}>
                        This message was sent from the SheMoves website contact form.
                    </Text>
                    <Text style={footerText}>
                        Reply directly to this email to respond to {name}.
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

const infoBox = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
};

const messageBox = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
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

const messageText = {
    color: '#000000',
    fontSize: '16px',
    margin: '0',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap' as const,
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

export default ContactFormEmail;
