"use server";

import { rm } from "fs/promises";
import path from "path";
import { prisma } from "@/server/db/prisma";

interface DeleteFileResult {
    success: boolean;
    error?: string;
    inUse?: boolean;
}

export async function deleteFile(
    id: string
): Promise<DeleteFileResult> {
    try {
        const file = await prisma.file.findUnique({
            where: { id },
        });

        if (!file) {
            return {
                success: false,
                error: "Файл не найден",
            };
        }

        // Проверка использования файла в других таблицах
        const doctorWithPhoto = await prisma.doctor.findFirst({
            where: { photo: file.url },
        });

        const doctorCertificateWithImage = await prisma.doctorCertificate.findFirst({
            where: { image: file.url },
        });

        const articleWithImage = await prisma.article.findFirst({
            where: { image: file.url },
        });

        const serviceImageWithUrl = await prisma.serviceImage.findFirst({
            where: { url: file.url },
        });

        if (doctorWithPhoto || doctorCertificateWithImage || articleWithImage || serviceImageWithUrl) {
            return {
                success: false,
                inUse: true,
                error: "Файл не может быть удален, так как он используется в другом месте",
            };
        }

        const filePath = path.join(
            process.cwd(),
            "public",
            file.url
        );

        await rm(filePath, { force: true });

        await prisma.file.delete({
            where: { id },
        });

        return {
            success: true,
        };
    } catch (error) {
        console.error("DELETE FILE ERROR:", error);

        return {
            success: false,
            error: "Ошибка удаления файла",
        };
    }
}
