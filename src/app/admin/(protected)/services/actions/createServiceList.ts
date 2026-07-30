"use server";

import { prisma } from "@/server/db/prisma";

import {
    serviceListSchema,
} from "@/lib/validations/serviceList";

export async function createServiceList(
    data: unknown
) {
    const result =
        serviceListSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        const serviceList =
            await prisma.serviceList.create({
                data: {
                    serviceId:
                        result.data.serviceId,

                    type:
                        result.data.type,

                    title:
                        result.data.title || null,

                    text:
                        result.data.text,

                    sortOrder:
                        result.data.sortOrder,
                },
            });

        return {
            success: true,
            data: serviceList,
        };
    } catch {
        return {
            success: false,
            errors: {
                form: "Ошибка при создании элемента",
            },
        };
    }
}