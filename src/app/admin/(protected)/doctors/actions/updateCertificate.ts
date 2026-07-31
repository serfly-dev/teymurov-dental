"use server";

import { prisma } from "@/server/db/prisma";

interface UpdateCertificateData {
    name: string;
    year?: number;
}

export async function updateCertificate(
    id: string,
    data: UpdateCertificateData
) {
    try {
        const certificate =
            await prisma.doctorCertificate.update({
                where: {
                    id,
                },
                data: {
                    name: data.name,
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
            error: "Не удалось обновить сертификат",
        };
    }
}