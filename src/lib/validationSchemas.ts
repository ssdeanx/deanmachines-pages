// src/lib/validationSchemas.ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'USER']),
  // Add other fields and validation rules as needed
});

export const machineSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    category: z.string().optional(),
});
