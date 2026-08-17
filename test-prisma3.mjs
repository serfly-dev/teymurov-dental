// Test import from prisma.ts - check if PrismaClient is imported
import { PrismaClient } from './src/generated/prisma/client.ts';
console.log('PrismaClient:', PrismaClient);
console.log('typeof PrismaClient:', typeof PrismaClient);

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis;

console.log('Creating PrismaClient...');
const p = new PrismaClient({
  adapter,
  log: ['error'],
});

console.log('p.file:', p.file ? 'EXISTS' : 'UNDEFINED');
console.log('p.file.findMany:', p.file?.findMany ? 'EXISTS' : 'UNDEFINED');
