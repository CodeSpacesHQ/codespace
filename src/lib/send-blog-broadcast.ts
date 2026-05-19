const SENDER_API_URL = 'https://api.sender.net/v2';
const NEWSLETTER_GROUP_ID = 'egMBRj';

interface SendBlogBroadcastProps {
    subject: string;
    html: string;
    text: string;
    fromName?: string;
}

export async function sendBlogBroadcast({ subject, html, text, fromName }: SendBlogBroadcastProps) {
    if (!process.env.SENDER_API_TOKEN) {
        console.error('Missing Sender API token');
        return;
    }

    try {
        const FROM_EMAIL = process.env.BROADCAST_FROM_EMAIL || 'hello@codespaces.org';
        const response = await fetch(`${SENDER_API_URL}/campaigns`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                title: subject,
                subject: subject,
                from: fromName || 'Code Space',
                reply_to: FROM_EMAIL,
                groups: [NEWSLETTER_GROUP_ID],
                content_type: 'html',
                html_content: html,
                plain_content: text,
                track_opens: true,
                track_clicks: true,
                // Some accounts ignore this and keep Draft; we'll explicitly call send API below
                send_immediately: true,
            }),
        });

        if (!response.ok) {
            const status = response.status;
            const body = await response.text();
            console.error('Sender API non-OK response', { status, body });
            throw new Error(`Sender API error ${status}: ${body?.slice(0, 300) || 'Unknown error'}`);
        }

        const created = await response.json();
        const campaignId = created?.id || created?.data?.id || created?.campaignId || created?.campaign_id;

        // Attempt to send the campaign now using the documented send endpoint
        if (campaignId) {
            const sendHeaders = {
                'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            } as const;

            // Try POST /campaigns/send with different common payload shapes
            const sendPayloads = [
                JSON.stringify({ id: campaignId }),
                JSON.stringify({ campaign_id: campaignId }),
            ];

            let sent = false;
            for (const body of sendPayloads) {
                const sendResp = await fetch(`${SENDER_API_URL}/campaigns/send`, {
                    method: 'POST',
                    headers: sendHeaders,
                    body,
                });
                if (sendResp.ok) {
                    sent = true;
                    break;
                }
            }

            // Fallback: try RESTful variant /campaigns/{id}/send
            if (!sent) {
                const altResp = await fetch(`${SENDER_API_URL}/campaigns/${campaignId}/send`, {
                    method: 'POST',
                    headers: sendHeaders,
                });
                if (!altResp.ok) {
                    const status = altResp.status;
                    const body = await altResp.text();
                    console.error('Sender send API non-OK response', { status, body });
                }
            }
        }

        return created;
    } catch (error) {
        console.error('Error sending blog broadcast:', error);
        throw error;
    }
}


