const SENDER_API_URL = 'https://api.sender.net/v2';
const NEWSLETTER_GROUP_ID = 'dw2jKz';

interface SendNewsletterEmailProps {
    subject: string;
    html: string;
    text: string;
}

export async function sendNewsletterEmail({ subject, html, text }: SendNewsletterEmailProps) {
    if (!process.env.SENDER_API_TOKEN) {
        console.error('Missing Sender API token');
        return;
    }

    try {
        const subscribersResponse = await fetch(
            `${SENDER_API_URL}/subscribers?group=${NEWSLETTER_GROUP_ID}&limit=1000`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!subscribersResponse.ok) {
            throw new Error('Failed to fetch subscribers');
        }

        const subscribersData = await subscribersResponse.json();
        const subscribers = subscribersData.data || [];

        if (subscribers.length === 0) {
            console.log('No subscribers found');
            return;
        }

        const response = await fetch(`${SENDER_API_URL}/campaigns`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: subject,
                subject: subject,
                from_name: 'Code Space',
                from_email: 'hello@codespaces.org',
                groups: [NEWSLETTER_GROUP_ID],
                html_content: html,
                plain_content: text,
                track_opens: true,
                track_clicks: true,
                send_immediately: true,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to send newsletter');
        }

        console.log('Newsletter sent successfully');
        return await response.json();
    } catch (error) {
        console.error('Error sending newsletter:', error);
        throw error;
    }
} 