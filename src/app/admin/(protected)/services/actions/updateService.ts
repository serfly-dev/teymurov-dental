"use server";

import { prisma } from "@/server/db/prisma";

import {
    serviceSchema,
} from "@/lib/validations/service";

export async function updateService(
    id: string,
    data: unknown
) {
    const result = serviceSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.service.update({
            where: {
                id,
            },

            data: {
                categoryId: result.data.categoryId,

                name: result.data.name,
                slug: result.data.slug,

                h1: result.data.h1 || null,

                shortDescription:
                    result.data.shortDescription || null,

                description:
                    result.data.description || null,
                price:

                    result.data.price

                        ? String(result.data.price)

                        : null,
                duration:
                    result.data.duration || null,

                seoTitle:
                    result.data.seoTitle || null,

                seoDescription:
                    result.data.seoDescription || null,

                seoKeywords:
                    result.data.seoKeywords || null,

                isPublished:
                    result.data.isPublished,

                sortOrder:
                    result.data.sortOrder,
            },
        });

        return {
            success: true,
        };

    } catch {
        return {
            success: false,
            errors: {
                form: "Ошибка при обновлении услуги",
            },
        };
    }
}