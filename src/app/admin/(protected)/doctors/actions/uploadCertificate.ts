"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function uploadCertificate(
    file: File
) {
    try {
        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const fileName =
            `${randomUUID()}-${file.name}`;

        const uploadDir = path.join(
            process.cwd(),
            "public",
            "uploads",
            "certificates"
        );
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            return {
                success: false,
                error: "Разрешены только JPG, PNG и WEBP",
            };
        }

        if (file.size > 5 * 1024 * 1024) {
            return {
                success: false,
                error: "Размер файла не должен превышать 5 МБ",
            };
        }
        await mkdir(uploadDir, {
            recursive: true,
        });

        const uploadPath = path.join(
            uploadDir,
            fileName
        );

        await writeFile(
            uploadPath,
            buffer
        );

        return {
            success: true,
            url: `/uploads/certificates/${fileName}`,
        };
    } catch (error) {
        console.error("UPLOAD ERROR:", error);

        return {
            success: false,
            error: "Ошибка загрузки файла",
        };
    }
}