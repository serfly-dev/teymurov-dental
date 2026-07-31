"use server";

import { prisma } from "@/server/db/prisma";
import { unlink } from "fs/promises";
import path from "path";

export async function deleteCertificate(
    id: string
) {
    try {
        const certificate =
            await prisma.doctorCertificate.findUnique({
                where: {
                    id,
                },
            });

        if (!certificate) {
            return {
                success: false,
                error: "Сертификат не найден",
            };
        }

        await prisma.doctorCertificate.delete({
            where: {
                id,
            },
        });

        if (certificate.image.startsWith("/uploads")) {
            const filePath = path.join(
                process.cwd(),
                "public",
                certificate.image
            );

            await unlink(filePath)
                .catch(() => {});
        }

        return {
            success: true,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Не удалось удалить сертификат",
        };
    }
}