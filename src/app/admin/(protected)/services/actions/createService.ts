"use server";

import { prisma } from "@/server/db/prisma";

import {
    serviceSchema,
} from "@/lib/validations/service";


export async function createService(
    data: unknown
) {
    const result = serviceSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false as const,
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        const service = await prisma.service.create({
            data: {
                categoryId: result.data.categoryId,

                name: result.data.name,

                slug: result.data.slug,

                h1: result.data.h1 || null,

                shortDescription:
                    result.data.shortDescription || null,

                description:
                    result.data.description || null,

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
            success: true as const,
            data: service,
        };

    } catch {

        return {
            success: false as const,
            errors: {
                form: "Ошибка при создании услуги",
            },
        };
    }
}