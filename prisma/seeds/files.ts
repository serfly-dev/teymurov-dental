import { PrismaClient } from "../../src/generated/prisma/client";

export async function seedFiles(prisma: PrismaClient) {
  console.log("Создание файлов...");

  await prisma.file.createMany({
    data: [
      {
        filename: "ivan-petrov.jpg",
        originalName: "Фото врача Иван Петров.jpg",
        mimeType: "image/jpeg",
        extension: ".jpg",
        size: 245000,
        url: "/uploads/doctors/ivan-petrov.jpg",
        alt: "Стоматолог Иван Петров",
      },
      {
        filename: "alexandr-smirnov.jpg",
        originalName: "Фото врача Александр Смирнов.jpg",
        mimeType: "image/jpeg",
        extension: ".jpg",
        size: 268000,
        url: "/uploads/doctors/alexandr-smirnov.jpg",
        alt: "Стоматолог хирург Александр Смирнов",
      },
      {
        filename: "maria-volkova.jpg",
        originalName: "Фото врача Мария Волкова.jpg",
        mimeType: "image/jpeg",
        extension: ".jpg",
        size: 221000,
        url: "/uploads/doctors/maria-volkova.jpg",
        alt: "Стоматолог гигиенист Мария Волкова",
      },

      {
        filename: "caries.jpg",
        originalName: "Лечение кариеса.jpg",
        mimeType: "image/jpeg",
        extension: ".jpg",
        size: 350000,
        url: "/uploads/services/caries.jpg",
        alt: "Лечение кариеса зубов",
      },
      {
        filename: "implant.jpg",
        originalName: "Имплантация зубов.jpg",
        mimeType: "image/jpeg",
        extension: ".jpg",
        size: 410000,
        url: "/uploads/services/implant.jpg",
        alt: "Имплантация зубов",
      },

      {
        filename: "certificate-ivan.jpg",
        originalName: "Сертификат врача Иван Петров.jpg",
        mimeType: "image/jpeg",
        extension: ".jpg",
        size: 520000,
        url: "/uploads/certificates/ivan-1.jpg",
        alt: "Сертификат стоматолога",
      },

      {
        filename: "karies-article.jpg",
        originalName: "Статья о кариесе.jpg",
        mimeType: "image/jpeg",
        extension: ".jpg",
        size: 380000,
        url: "/uploads/articles/karies.jpg",
        alt: "Кариес зубов",
      },
    ],
  });

  console.log("Файлы созданы");
}