"use server";

import { prisma } from "@/server/db/prisma";

export async function updateContactRequestStatus(
    id: string,
    status: "NEW" | "CALLED" | "COMPLETED" | "CANCELED"
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

        await prisma.contactRequest.update({
            where: {
                id,
            },

            data: {
                status,
            },
        });

        return {
            success: true as const,
        };
    } catch {
        return {
            success: false as const,
            errors: {
                form: "Не удалось изменить статус",
            },
        };
    }
}