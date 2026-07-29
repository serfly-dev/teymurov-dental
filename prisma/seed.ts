import { PrismaClient, UserRole } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: {
      email: "admin@teymurov.ru",
    },
    update: {},
    create: {
      email: "admin@teymurov.ru",
      passwordHash,
      firstName: "Администратор",
      lastName: "Сайта",
      role: UserRole.ADMIN,
    },
  });

  console.log("Admin created");
}

main()
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });