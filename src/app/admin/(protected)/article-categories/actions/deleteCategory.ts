"use server";

import { prisma } from "@/server/db/prisma";

export async function deleteCategory(id: string) {
    try {
        const category =
            await prisma.articleCategory.findUnique({
                where: {
                    id,
                },
                include: {
                    _count: {
                        select: {
                            articles: true,
                        },
                    },
                },
            });

        if (!category) {
            return {
                success: false,
                errors: {
                    form: [
                        "Категория не найдена",
                    ],
                },
            };
        }

        if (category._count.articles > 0) {
            return {
                success: false,
                errors: {
                    form: [
                        "Нельзя удалить категорию, пока в ней есть статьи",
                    ],
                },
            };
        }

        await prisma.articleCategory.delete({
            where: {
                id,
            },
        });

        return {
            success: true,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            errors: {
                form: [
                    "Не удалось удалить категорию",
                ],
            },
        };
    }
}