"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/server/db/prisma";
import { categorySchema } from "@/lib/validations/category";

export async function updateCategory(
  id: string,
  data: unknown,
) {
  const result = categorySchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const exists = await prisma.serviceCategory.findFirst({
    where: {
      slug: result.data.slug,
      NOT: {
        id,
      },
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

  await prisma.serviceCategory.update({
    where: {
      id,
    },
    data: result.data,
  });

  revalidatePath("/admin/service-categories");

  return {
    success: true,
  };
}