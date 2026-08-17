"use server";

import { mkdir, readFile, rm, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { prisma } from "@/server/db/prisma";

const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface UploadFileResult {
    success: boolean;
    error?: string;
    file?: {
        id: string;
        filename: string;
        originalName: string;
        mimeType: string;
        extension: string;
        size: number;
        url: string;
        alt: string | null;
        createdAt: Date;
    };
}

export async function uploadFile(
    file: File
): Promise<UploadFileResult> {
    try {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return {
                success: false,
                error:
                    "Разрешены только JPG, PNG, WEBP, GIF и PDF",
            };
        }

        if (file.size > MAX_FILE_SIZE) {
            return {
                success: false,
                error: "Размер файла не должен превышать 10 МБ",
            };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const extension = path.extname(file.name).toLowerCase();
        const fileName = `${randomUUID()}${extension}`;

        const uploadDir = path.join(
            process.cwd(),
            "public",
            "uploads"
        );

        await mkdir(uploadDir, {
            recursive: true,
        });

        const uploadPath = path.join(uploadDir, fileName);

        await writeFile(uploadPath, buffer);

        const fileSize = buffer.length;

        const dbFile = await prisma.file.create({
            data: {
                filename: fileName,
                originalName: file.name,
                mimeType: file.type,
                extension,
                size: fileSize,
                url: `/uploads/${fileName}`,
            },
        });

        return {
            success: true,
            file: dbFile,
        };
    } catch (error) {
        console.error("UPLOAD FILE ERROR:", error);

        return {
            success: false,
            error: "Ошибка загрузки файла",
        };
    }
}
