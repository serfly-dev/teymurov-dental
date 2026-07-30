"use server";

import { prisma } from "@/server/db/prisma";

import {
    serviceListSchema,
} from "@/lib/validations/serviceList";


export async function updateServiceList(
    id: string,
    data: unknown
) {
    const result =
        serviceListSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            errors:
                result.error.flatten()
                    .fieldErrors,
        };
    }

    try {
        const item =
            await prisma.serviceList.update({
                where: {
                    id,
                },

                data: {
                    type:
                        result.data.type,

                    title:
                        result.data.title ||
                        null,

                    text:
                        result.data.text,

                    sortOrder:
                        result.data.sortOrder,
                },
            });

        return {
            success: true,
            data: item,
        };

    } catch {
        return {
            success: false,
            errors: {
                form:
                    "Ошибка обновления пункта",
            },
        };
    }
}