// pages/api/contact.ts (Correct)
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { message: string }>
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Basic input validation
    if (!name || !email || !message) {
      res.status(400).json({ message: 'Name, email, and message are required.' });
      return;
    }
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
        res.status(400).json({ message: 'Invalid input types.' });
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { //Simple email check
        res.status(400).json({ message: 'Invalid Email Format.' });
        return;
    }

    console.log('Received form data:', { name, email, message });

    // Simulate a successful response (replace with your actual logic)
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

    res.status(200).json({ message: 'Message received successfully!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}