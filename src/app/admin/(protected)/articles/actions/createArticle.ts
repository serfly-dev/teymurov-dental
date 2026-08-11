"use server";

import { prisma } from "@/server/db/prisma";

import {
    articleSchema,
    type ArticleSchema,
} from "@/lib/validations/article";

export async function createArticle(
    data: ArticleSchema
) {
    const validation =
        articleSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors,
        };
    }

    try {
        const existingArticle =
            await prisma.article.findUnique({
                where: {
                    slug: validation.data.slug,
                },
            });

        if (existingArticle) {
            return {
                success: false,
                errors: {
                    form: [
                        "Статья с таким slug уже существует",
                    ],
                },
            };
        }

        const article =
            await prisma.article.create({
                data: {
                    categoryId:
                        validation.data.categoryId,

                    title:
                        validation.data.title,

                    slug:
                        validation.data.slug,

                    excerpt:
                        validation.data.excerpt || null,

                    content:
                        validation.data.content,

                    image:
                        validation.data.image || null,

                    h1:
                        validation.data.h1 || null,

                    seoTitle:
                        validation.data.seoTitle || null,

                    seoDescription:
                        validation.data.seoDescription || null,

                    isPublished:
                        validation.data.isPublished,

                    publishedAt:
                        validation.data.isPublished
                            ? new Date()
                            : null,

                    sortOrder:
                        validation.data.sortOrder,
                },
            });

        return {
            success: true,
            data: article,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            errors: {
                form: [
                    "Не удалось создать статью",
                ],
            },
        };
    }
}