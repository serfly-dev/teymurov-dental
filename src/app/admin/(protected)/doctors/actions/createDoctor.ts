"use server";

import { prisma } from "@/server/db/prisma";
import {
    doctorSchema,
    type DoctorSchema,
} from "@/lib/validations/doctor";

export async function createDoctor(
    data: DoctorSchema,
    serviceIds: string[]
) {
    const validation = doctorSchema.safeParse(data);

    if (!validation.success) {
        return {
            success: false,
            errors: validation.error.flatten().fieldErrors,
        };
    }

    try {
        const existingDoctor = await prisma.doctor.findUnique({
            where: {
                slug: validation.data.slug,
            },
        });

        if (existingDoctor) {
            return {
                success: false,
                errors: {
                    form: [
                        "Врач с таким slug уже существует",
                    ],
                },
            };
        }

        const doctor = await prisma.doctor.create({
            data: {
                ...validation.data,

                services: {
                    create: serviceIds.map((serviceId) => ({
                        serviceId,
                    })),
                },
            },
        });
        return {
            success: true,
            data: doctor,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            errors: {
                form: [
                    "Не удалось создать врача",
                ],
            },
        };
    }
}