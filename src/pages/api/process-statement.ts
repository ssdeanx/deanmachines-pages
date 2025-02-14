// pages/api/process-statement.ts  FIX LATER
import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { Veryfi } from '@veryfi/sdk';

// Configure Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Initialize Veryfi Client
const veryfiClient = new Veryfi({
  clientId: process.env.VERYFI_CLIENT_ID!,
  clientSecret: process.env.VERYFI_CLIENT_SECRET!,
  username: process.env.VERYFI_USERNAME!,
  apiKey: process.env.VERYFI_API_KEY!,
});

// Define a type for the extracted transaction
interface Transaction {
  name: string;
  amount: number;
  date?: string;
  dueDate?: string; //For bills
  description: string;
}
interface VeryfiLineItem {
    id: number;
    date: string;
    description: string;
    total: number;
    tax: number;
    order: number;
    type: string;
    vendor: object; //Simplified
}

interface VeryfiResponse {
    line_items: VeryfiLineItem[];
    vendor: {name: string};
    date: string;
    due_date: string;
    total: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await new Promise((resolve, reject) => {
      upload.single('statement')(req as any, res as any, (err: any) => {
        if (err) {
          if (err instanceof multer.MulterError) {
            return reject(new Error(`Multer error: ${err.message}`));
          }
          return reject(err);
        }
        resolve(true);
      });
    });

    const typedReq = req as any; // Type assertion for req

    if (!typedReq.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Define categories for better accuracy
    const categories = ['Finance']; // Use appropriate Veryfi categories

    // Process the document with Veryfi
    const response: VeryfiResponse = await veryfiClient.process_document_buffer(
      typedReq.file.buffer,
      typedReq.file.originalname,
      'application/pdf', // Correct MIME type
      categories, // Pass categories
    );

    // Extract relevant data (refined logic)
    const extractedData: {
      subscriptions: Transaction[];
      bills: Transaction[];
      otherTransactions: Transaction[];
    } = {
      subscriptions: [],
      bills: [],
      otherTransactions: [],
    };

    // Iterate through line items and categorize
        for (const item of response.line_items) {
            const descriptionLower = item.description.toLowerCase();
            let transaction: Transaction = {
                name: item.vendor && typeof item.vendor === 'object' && 'name' in item.vendor ? (item.vendor as { name: string }).name : item.description, // Use vendor name if available
                amount: item.total,
                date: item.date,
                description: item.description,
            };

            if (descriptionLower.includes('subscription') || (item.vendor && typeof item.vendor === 'object' && 'name' in item.vendor && (item.vendor as {name: string}).name.toLowerCase().includes('subscription'))) {
                extractedData.subscriptions.push(transaction);
            } else if (descriptionLower.includes('bill') || (response.due_date && item.date == response.date)) { //Added logic for bills
                transaction.dueDate = response.due_date
                extractedData.bills.push(transaction);
            }
            else {
                extractedData.otherTransactions.push(transaction);
            }
        }

    return res.status(200).json(extractedData);

  } catch (error: any) {
    console.error('Error processing statement:', error);

    // Handle Veryfi-specific errors
    if (error.response && error.response.data && error.response.data.error) {
      const veryfiError = error.response.data.error;
      // You could add more specific handling based on Veryfi's error codes here
      return res.status(error.response.status).json({ error: `Veryfi API Error: ${veryfiError}` });
    }

    return res.status(500).json({ error: error.message || 'Failed to process statement.' });
  }
}

// Disable Next.js's default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};