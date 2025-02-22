import { PrismaClient } from '@prisma/client'

// Extend the global type to include prisma
interface CustomGlobal {
  prisma: PrismaClient | undefined;
}

declare const global: CustomGlobal;

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma