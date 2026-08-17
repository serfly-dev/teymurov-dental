"use server";

import { prisma } from "@/server/db/prisma";

interface UpdateDoctorCertificateResult {
    success: boolean;
    error?: string;
    data?: {
        id: string;
        image: string;
    };
}

export async function updateDoctorCertificate(
    id: string,
    image: string
): Promise<UpdateDoctorCertificateResult> {
    try {
        const certificate = await prisma.doctorCertificate.update({
            where: { id },
            data: { image },
        });

        return {
            success: true,
            data: {
                id: certificate.id,
                image: certificate.image,
            },
        };
    } catch (error) {
        console.error("UPDATE DOCTOR CERTIFICATE ERROR:", error);

        return {
            success: false,
            error: "Ошибка обновления сертификата",
        };
    }
}
