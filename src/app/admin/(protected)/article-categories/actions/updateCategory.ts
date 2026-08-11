"use server";

import { prisma } from "@/server/db/prisma";

import {
    articleCategorySchema,
    type ArticleCategorySchema,
} from "@/lib/validations/articleCategory";

export async function updateCategory(
    id: string,
    data: ArticleCategorySchema
) {
    const validation =
        articleCategorySchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors,
        };
    }

    try {
        const existingCategory =
            await prisma.articleCategory.findFirst({
                where: {
                    slug: validation.data.slug,
                    NOT: {
                        id,
                    },
                },
            });

        if (existingCategory) {
            return {
                success: false,
                errors: {
                    form: [
                        "Категория с таким slug уже существует",
                    ],
                },
            };
        }

        const category =
            await prisma.articleCategory.update({
                where: {
                    id,
                },
                data: validation.data,
            });

        return {
            success: true,
            data: category,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            errors: {
                form: [
                    "Не удалось обновить категорию",
                ],
            },
        };
    }
}