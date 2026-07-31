"use server";

import { prisma } from "@/server/db/prisma";

interface CreateCertificateData {
    doctorId: string;
    name: string;
    image: string;
    year?: number;
}

export async function createCertificate(
    data: CreateCertificateData
) {
    try {
        const certificate =
            await prisma.doctorCertificate.create({
                data: {
                    doctorId: data.doctorId,
                    name: data.name,
                    image: data.image,
                    year: data.year,
                },
            });

        return {
            success: true,
            data: certificate,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Не удалось создать сертификат",
        };
    }
}