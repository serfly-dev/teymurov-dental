"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function uploadDoctorPhoto(
    file: File
) {
    try {
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

        const bytes =
            await file.arrayBuffer();

        const buffer =
            Buffer.from(bytes);

        const fileName =
            `${randomUUID()}-${file.name}`;

        const uploadDir =
            path.join(
                process.cwd(),
                "public",
                "uploads",
                "doctors"
            );

        await mkdir(uploadDir, {
            recursive: true,
        });

        const uploadPath =
            path.join(
                uploadDir,
                fileName
            );

        await writeFile(
            uploadPath,
            buffer
        );

        return {
            success: true,
            url: `/uploads/doctors/${fileName}`,
        };

    } catch (error) {
        console.error(
            "UPLOAD DOCTOR PHOTO ERROR:",
            error
        );

        return {
            success: false,
            error: "Ошибка загрузки фотографии",
        };
    }
}