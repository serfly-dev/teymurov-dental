"use server";

import { prisma } from "@/server/db/prisma";
import { unlink } from "fs/promises";
import path from "path";


export async function updateCertificateImage(
    id: string,
    image: string
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


        if (
            certificate.image.startsWith("/uploads")
        ) {
            const oldPath = path.join(
                process.cwd(),
                "public",
                certificate.image
            );

            await unlink(oldPath)
                .catch(() => {});
        }


        const updated =
            await prisma.doctorCertificate.update({
                where: {
                    id,
                },
                data: {
                    image,
                },
            });


        return {
            success: true,
            data: updated,
        };

    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Не удалось обновить изображение",
        };
    }
}