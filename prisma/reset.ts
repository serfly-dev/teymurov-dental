import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  console.log("🗑 Очистка базы...");
  await prisma.doctorService.deleteMany();
  await prisma.serviceFaq.deleteMany();
  await prisma.serviceImage.deleteMany();
  await prisma.serviceBlock.deleteMany();
  await prisma.serviceList.deleteMany();
  await prisma.contactRequest.deleteMany();
  await prisma.doctorCertificate.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.article.deleteMany();
  await prisma.articleCategory.deleteMany();
  await prisma.service.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.file.deleteMany();
  console.log("✅ База очищена");
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