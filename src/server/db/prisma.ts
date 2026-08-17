import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// DEBUG: Check if PrismaClient can be imported
console.log('[PRISMA] About to import PrismaClient...');

try {
  const clientModule = await import("@/generated/prisma/client");
  console.log('[PRISMA] Client module exports:', Object.keys(clientModule));
  console.log('[PRISMA] PrismaClient:', clientModule.PrismaClient);
  console.log('[PRISMA] typeof PrismaClient:', typeof clientModule.PrismaClient);

  if (!clientModule.PrismaClient) {
    console.error('[PRISMA] ERROR: PrismaClient is undefined!');
  }
} catch (e) {
  console.error('[PRISMA] Error importing PrismaClient:', e);
}

// Re-import normally for actual use
import { PrismaClient } from "@/generated/prisma/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

// DEBUG
console.log('[PRISMA] Creating PrismaClient...');
console.log('[PRISMA] PrismaClient type:', typeof PrismaClient);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error"],
  });

// DEBUG
console.log('[PRISMA] Prisma instance created:', !!prisma);
console.log('[PRISMA] prisma.file:', prisma?.file ? 'EXISTS' : 'UNDEFINED');

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
