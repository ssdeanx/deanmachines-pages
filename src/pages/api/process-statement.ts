import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
    }

    try {
        const { statement } = req.body;

        if (!statement || typeof statement !== 'string') {
            return res.status(400).json({ message: 'Invalid request body.  "statement" must be a string.' });
        }

        // **---  Your Processing Logic Here  ---**
        // In this example, we'll just convert the statement to uppercase
        const processedStatement = statement.toUpperCase();

        console.log('Processed Statement:', processedStatement);

        // In a real application, you might:
        // - Validate the statement against a schema
        // - Perform calculations or data transformations
        // - Interact with a database or external API
        // - etc.

        return res.status(200).json({
            message: 'Statement processed successfully.',
            processedStatement: processedStatement,
        });

    } catch (error) {
        console.error('Error processing statement:', error);
        return res.status(500).json({ message: 'Failed to process statement.', error: error.message });
    }
} 