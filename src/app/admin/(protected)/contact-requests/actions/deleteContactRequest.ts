"use server";

import { prisma } from "@/server/db/prisma";

export async function deleteContactRequest(
    id: string
) {
    try {
        const contactRequest =
            await prisma.contactRequest.findUnique({
                where: {
                    id,
                },
            });

        if (!contactRequest) {
            return {
                success: false as const,
                errors: {
                    form: "Обращение не найдено",
                },
            };
        }

        await prisma.contactRequest.delete({
            where: {
                id,
            },
        });

        return {
            success: true as const,
        };

    } catch {
        return {
            success: false as const,
            errors: {
                form: "Не удалось удалить обращение",
            },
        };
    }
}