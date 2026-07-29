"use server";

import { prisma } from "@/server/db/prisma";

export async function deleteCategory(id: string) {
  try {
    const category = await prisma.serviceCategory.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            services: true,
          },
        },
      },
    });

    if (!category) {
      return {
        success: false,
        errors: {
          form: "Категория не найдена",
        },
      };
    }

    if (category._count.services > 0) {
      return {
        success: false,
        errors: {
          form: "Нельзя удалить категорию, пока в ней есть услуги",
        },
      };
    }

    await prisma.serviceCategory.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      errors: {
        form: "Произошла ошибка при удалении категории",
      },
    };
  }
}