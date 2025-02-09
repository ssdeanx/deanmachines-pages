// src/lib/apiErrorHandler.ts
import { NextApiResponse } from 'next';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type ApiError = PrismaClientKnownRequestError | Error | { name: string; message: string; code?: string };

export function apiErrorHandler(res: NextApiResponse, error: ApiError) {
  console.error(error); // Log the error for debugging

  if (error instanceof PrismaClientKnownRequestError) {
    // Handle specific Prisma errors
    return res.status(400).json({ message: 'Database error', code: error.code });
  }
   if (error.name === "UnauthorizedError") {
      return res.status(401).json({ message: error.message });
    }
  if (error instanceof Error) {
    return res.status(400).json({message: error.message})
  }

  // Generic error handling
  return res.status(500).json({ message: 'Internal Server Error' });
}

export default apiErrorHandler;