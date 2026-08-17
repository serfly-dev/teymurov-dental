import { PrismaClient } from "../../src/generated/prisma/client";

export async function seedDoctors(
  prisma: PrismaClient,
  services: {
    caries: { id: string };
    implant: { id: string };
    cleaning: { id: string };
  }
) {
  console.log("Создание врачей...");

  const doctor1 = await prisma.doctor.create({
    data: {
      fullName: "Иван Петров",
      slug: "ivan-petrov",

      specialization: "Стоматолог-терапевт",

      experience: "12 лет опыта",
      careerStartYear: 2014,

      education:
        "Уральский государственный медицинский университет. Специальность — стоматология.",

      biography:
        "Специализируется на лечении кариеса, восстановлении зубов и эстетической реставрации.",

      photo: "/uploads/doctors/ivan-petrov.jpg",

      h1: "Иван Петров — стоматолог-терапевт",

      seoTitle:
        "Стоматолог-терапевт Иван Петров | Клиника Теймурова",

      seoDescription:
        "Врач стоматолог-терапевт Иван Петров. Лечение кариеса, восстановление зубов.",

      certificates: {
        create: [
          {
            name: "Сертификат стоматолога",
            image: "/uploads/certificates/ivan-1.jpg",
            year: 2023,
          },
          {
            name: "Курс современной терапии",
            image: "/uploads/certificates/ivan-2.jpg",
            year: 2024,
          },
        ],
      },
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      fullName: "Александр Смирнов",
      slug: "alexandr-smirnov",

      specialization: "Стоматолог-хирург и имплантолог",

      experience: "15 лет опыта",
      careerStartYear: 2011,

      education:
        "Медицинская академия. Специализация — хирургическая стоматология.",

      biography:
        "Проводит операции по удалению зубов и имплантации.",

      photo: "/uploads/doctors/alexandr-smirnov.jpg",

      h1: "Александр Смирнов — хирург-имплантолог",

      seoTitle:
        "Хирург-имплантолог Александр Смирнов",

      seoDescription:
        "Опытный стоматолог-хирург. Имплантация и хирургическое лечение зубов.",

      certificates: {
        create: [
          {
            name: "Сертификат имплантолога",
            image: "/uploads/certificates/alexandr-1.jpg",
            year: 2024,
          },
        ],
      },
    },
  });

  const doctor3 = await prisma.doctor.create({
    data: {
      fullName: "Мария Волкова",
      slug: "maria-volkova",

      specialization: "Стоматолог-гигиенист",

      experience: "8 лет опыта",
      careerStartYear: 2018,

      education:
        "Медицинский университет. Профессиональная гигиена полости рта.",

      biography:
        "Специалист по профессиональной чистке зубов и профилактике заболеваний.",

      photo: "/uploads/doctors/maria-volkova.jpg",

      h1: "Мария Волкова — стоматолог-гигиенист",

      seoTitle:
        "Стоматолог-гигиенист Мария Волкова",

      seoDescription:
        "Профессиональная чистка зубов и профилактика заболеваний у стоматолога.",

      certificates: {
        create: [
          {
            name: "Курс профессиональной гигиены",
            image: "/uploads/certificates/maria-1.jpg",
            year: 2025,
          },
        ],
      },
    },
  });


  await prisma.doctorService.createMany({
    data: [
      {
        doctorId: doctor1.id,
        serviceId: services.caries.id,
      },
      {
        doctorId: doctor1.id,
        serviceId: services.cleaning.id,
      },
      {
        doctorId: doctor2.id,
        serviceId: services.implant.id,
      },
      {
        doctorId: doctor3.id,
        serviceId: services.cleaning.id,
      },
    ],
  });

  console.log("Врачи созданы");

  return {
    doctor1,
    doctor2,
    doctor3,
  };
}