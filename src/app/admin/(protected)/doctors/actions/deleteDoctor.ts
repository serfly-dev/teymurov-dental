"use server";

import { prisma } from "@/server/db/prisma";

export async function deleteDoctor(id: string) {
    try {
        await prisma.doctor.delete({
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
                    "Не удалось удалить врача",
                ],
            },
        };
    }
}