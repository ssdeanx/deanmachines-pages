// src/lib/validationSchemas.ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.enum(['ADMIN', 'USER']).optional(), // Validate the role
  // Add other fields and validation rules as needed
});

export const machineSchema = z.object({
    title: z.string().min(1, {message: "Title is required"}),
    description: z.string().min(1, {message: "Description is required"}),
    image: z.string().url({message: "Must be a valid URL"}),
    price: z.number().positive({message: "Price must be a positive number"}),
    category: z.string().optional(),
});
