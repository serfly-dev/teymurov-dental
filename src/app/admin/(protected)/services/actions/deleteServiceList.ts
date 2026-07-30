"use server";

import { prisma } from "@/server/db/prisma";

export async function deleteServiceList(
    id: string
) {
    try {
        await prisma.serviceList.delete({
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
                form: "Ошибка при удалении элемента",
            },
        };
    }
}