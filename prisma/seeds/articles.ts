import { PrismaClient } from "../../src/generated/prisma/client";

export async function seedArticles(prisma: PrismaClient) {
  console.log("Создание статей...");

  const treatmentCategory = await prisma.articleCategory.create({
    data: {
      name: "Лечение зубов",
      slug: "lechenie-zubov",
      sortOrder: 1,
    },
  });

  const implantCategory = await prisma.articleCategory.create({
    data: {
      name: "Имплантация",
      slug: "implantaciya",
      sortOrder: 2,
    },
  });

  const careCategory = await prisma.articleCategory.create({
    data: {
      name: "Уход за зубами",
      slug: "uhod-za-zubami",
      sortOrder: 3,
    },
  });

  await prisma.article.createMany({
    data: [
      {
        categoryId: treatmentCategory.id,

        title: "Почему появляется кариес и как его предотвратить",
        slug: "pochemu-poyavlyaetsya-karies",

        excerpt:
          "Причины возникновения кариеса, симптомы и способы профилактики.",

        content:
          "Кариес является одним из самых распространенных заболеваний зубов. Он развивается из-за воздействия бактерий, недостаточной гигиены и других факторов.",

        image: "/uploads/articles/karies.jpg",

        h1: "Почему появляется кариес",

        seoTitle:
          "Причины кариеса зубов и профилактика",

        seoDescription:
          "Разбираем причины появления кариеса, основные симптомы и методы профилактики.",

        isPublished: true,

        publishedAt: new Date(),
      },

      {
        categoryId: implantCategory.id,

        title: "Сколько служат зубные импланты",

        slug: "skolko-sluzhat-zubnye-implanty",

        excerpt:
          "Срок службы имплантов и факторы, которые влияют на их долговечность.",

        content:
          "Современные зубные импланты рассчитаны на длительный срок службы при правильной установке и уходе.",

        image: "/uploads/articles/implanty.jpg",

        h1: "Срок службы зубных имплантов",

        seoTitle:
          "Сколько служат зубные импланты",

        seoDescription:
          "Информация о сроке службы имплантов, уходе и факторах долговечности.",

        isPublished: true,

        publishedAt: new Date(),
      },

      {
        categoryId: careCategory.id,

        title: "Как правильно ухаживать за зубами",

        slug: "kak-uhazhivat-za-zubami",

        excerpt:
          "Основные правила ежедневной гигиены полости рта.",

        content:
          "Регулярная чистка зубов, использование дополнительных средств ухода и профилактические осмотры помогают сохранить здоровье зубов.",

        image: "/uploads/articles/uhod.jpg",

        h1: "Правильный уход за зубами",

        seoTitle:
          "Как правильно ухаживать за зубами",

        seoDescription:
          "Правила ухода за зубами для сохранения здоровья полости рта.",

        isPublished: true,

        publishedAt: new Date(),
      },
    ],
  });

  console.log("Статьи созданы");
}