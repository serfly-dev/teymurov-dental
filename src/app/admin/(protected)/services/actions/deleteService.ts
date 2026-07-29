"use server";

import { prisma } from "@/server/db/prisma";

export async function deleteService(id: string) {
    try {
        const service = await prisma.service.findUnique({
            where: {
                id,
            },
        });

        if (!service) {
            return {
                success: false,
                errors: {
                    form: "Услуга не найдена",
                },
            };
        }

        await prisma.service.delete({
            where: {
                id,
            },
        });

        return {
            success: true,
        };
    } catch {
        return {
            success: false,
            errors: {
                form: "Ошибка при удалении услуги",
            },
        };
    }
}