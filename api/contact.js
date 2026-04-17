export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Here you would normally send an email using a service like SendGrid, Mailgun, etc.
    // For now, we'll just log it and return success
    console.log('Contact form submission:', { name, email, subject, message });

    // In production, you'd use the CONTACT_TO_EMAIL environment variable
    // const toEmail = process.env.CONTACT_TO_EMAIL;
    // await sendEmail({ to: toEmail, from: email, subject, message });

    return res.status(200).json({ 
      message: 'Message sent successfully!',
      success: true 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      message: 'Error sending message',
      success: false 
    });
  }
}
