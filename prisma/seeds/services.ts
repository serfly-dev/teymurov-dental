import { PrismaClient, ServiceListType } from "../../src/generated/prisma/client";

export async function seedServices(prisma: PrismaClient) {
  console.log("Создание услуг...");

  const category = await prisma.serviceCategory.create({
    data: {
      name: "Терапевтическая стоматология",
      slug: "terapevticheskaya-stomatologiya",
      description:
        "Лечение кариеса, восстановление зубов и профилактика заболеваний полости рта.",
      sortOrder: 1,
    },
  });

  const implantCategory = await prisma.serviceCategory.create({
    data: {
      name: "Имплантация зубов",
      slug: "implantaciya-zubov",
      description:
        "Восстановление отсутствующих зубов с помощью современных имплантационных систем.",
      sortOrder: 2,
    },
  });

  const cleaningCategory = await prisma.serviceCategory.create({
    data: {
      name: "Гигиена и эстетика",
      slug: "gigiena-i-estetika",
      description:
        "Профессиональная чистка и процедуры для здоровья и красоты улыбки.",
      sortOrder: 3,
    },
  });

  const caries = await prisma.service.create({
    data: {
      categoryId: category.id,

      name: "Лечение кариеса",
      slug: "lechenie-kariesa",

      h1: "Лечение кариеса зубов",

      shortDescription:
        "Безболезненное лечение кариеса с восстановлением естественной формы зуба.",

      description:
        "Современное лечение кариеса с использованием качественных материалов и оборудования.",

      price: "от 5000 ₽",
      duration: "30-60 минут",

      seoTitle:
        "Лечение кариеса зубов в стоматологии | Цена и запись",
      seoDescription:
        "Лечение кариеса зубов у стоматолога. Современные методы, безопасная анестезия и восстановление зубов.",

      blocks: {
        create: [
          {
            title: "Когда требуется лечение",
            content:
              "Лечение необходимо при появлении боли, чувствительности зубов или обнаружении кариозного поражения.",
          },
          {
            title: "Как проходит процедура",
            content:
              "Диагностика, обезболивание, удаление пораженных тканей и восстановление зуба.",
          },
        ],
      },

      faqs: {
        create: [
          {
            question: "Больно ли лечить кариес?",
            answer:
              "Нет, процедура проводится с использованием современной анестезии.",
          },
          {
            question: "Сколько длится лечение?",
            answer:
              "Обычно лечение занимает от 30 до 60 минут.",
          },
        ],
      },

      lists: {
        create: [
          {
            type: ServiceListType.BENEFIT,
            title: "Преимущества",
            text: "Сохранение собственного зуба и восстановление эстетики.",
          },
          {
            type: ServiceListType.STAGE,
            title: "Этапы",
            text: "Осмотр → обезболивание → лечение → восстановление.",
          },
        ],
      },

      images: {
        create: [
          {
            url: "/uploads/services/caries.jpg",
            alt: "Лечение кариеса",
            isMain: true,
          },
        ],
      },
    },
  });

  const implant = await prisma.service.create({
    data: {
      categoryId: implantCategory.id,

      name: "Имплантация зубов",
      slug: "implantaciya-zubov",

      h1: "Имплантация зубов",

      shortDescription:
        "Восстановление отсутствующих зубов с помощью имплантов.",

      description:
        "Установка зубных имплантов для восстановления функции и эстетики улыбки.",

      price: "от 70000 ₽",
      duration: "3-6 месяцев",

      seoTitle:
        "Имплантация зубов цена | Установка имплантов",

      seoDescription:
        "Имплантация зубов в стоматологии. Современные импланты, консультация врача.",

      blocks: {
        create: [
          {
            title: "Преимущества имплантации",
            content:
              "Импланты выглядят естественно и позволяют полностью восстановить зубной ряд.",
          },
        ],
      },

      faqs: {
        create: [
          {
            question: "Сколько служит имплант?",
            answer:
              "При правильном уходе импланты могут служить десятки лет.",
          },
        ],
      },
    },
  });

  const cleaning = await prisma.service.create({
    data: {
      categoryId: cleaningCategory.id,

      name: "Профессиональная чистка зубов",
      slug: "professionalnaya-chistka-zubov",

      h1: "Профессиональная чистка зубов",

      shortDescription:
        "Удаление налета и профилактика заболеваний зубов.",

      price: "от 4000 ₽",

      seoTitle:
        "Профессиональная чистка зубов цена",

      seoDescription:
        "Удаление зубного камня и налета профессиональной чисткой.",

    },
  });

  console.log("Услуги созданы");

  return {
    caries,
    implant,
    cleaning,
  };
}