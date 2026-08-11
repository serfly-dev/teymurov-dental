"use server";

import { prisma } from "@/server/db/prisma";

export async function deleteArticle(
    id: string
) {
    try {
        const article =
            await prisma.article.findUnique({
                where: {
                    id,
                },
            });

        if (!article) {
            return {
                success: false,
                errors: {
                    form: [
                        "Статья не найдена",
                    ],
                },
            };
        }

        await prisma.article.delete({
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
                    "Не удалось удалить статью",
                ],
            },
        };
    }
}