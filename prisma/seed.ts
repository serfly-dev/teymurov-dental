import { PrismaClient, UserRole } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

import { seedServices } from "./seeds/services";
import { seedDoctors } from "./seeds/doctors";
import { seedArticles } from "./seeds/articles";
import { seedRequests } from "./seeds/requests";
import { seedFiles } from "./seeds/files";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  console.log("🌱 Запуск seed...");

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

  console.log("✅ Admin created");
  const services = await seedServices(prisma);
  await seedDoctors(prisma, services);
  await seedArticles(prisma);
  await seedRequests(prisma, services);
  await seedFiles(prisma);
  console.log("✅ Database seeded");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });