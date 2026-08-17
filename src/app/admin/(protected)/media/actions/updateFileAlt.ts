"use server";

import { prisma } from "@/server/db/prisma";

interface UpdateFileAltResult {
    success: boolean;
    error?: string;
    file?: {
        id: string;
        alt: string | null;
    };
}

export async function updateFileAlt(
    id: string,
    alt: string | null
): Promise<UpdateFileAltResult> {
    try {
        const file = await prisma.file.update({
            where: { id },
            data: { alt },
        });

        return {
            success: true,
            file: {
                id: file.id,
                alt: file.alt,
            },
        };
    } catch (error) {
        console.error("UPDATE FILE ALT ERROR:", error);

        return {
            success: false,
            error: "Ошибка обновления alt",
        };
    }
}
