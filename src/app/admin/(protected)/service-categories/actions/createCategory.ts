"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/server/db/prisma";
import { categorySchema } from "@/lib/validations/category";

export async function createCategory(data: unknown) {
  const result = categorySchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const exists = await prisma.serviceCategory.findUnique({
    where: {
      slug: result.data.slug,
    },
  });

  if (exists) {
    return {
      success: false,
      errors: {
        slug: ["Категория с таким slug уже существует"],
      },
    };
  }

  await prisma.serviceCategory.create({
    data: result.data,
  });

  revalidatePath("/admin/service-categories");

  return {
    success: true,
  };
}