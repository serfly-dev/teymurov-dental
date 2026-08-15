"use server";

import { prisma } from "@/server/db/prisma";

import {
    contactRequestSchema,
} from "@/lib/validations/contact-request";

export async function createContactRequest(
    data: unknown
) {
    const result =
        contactRequestSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false as const,
            errors: result.error.flatten().fieldErrors,
        };
    }

    if (result.data.website) {
        return {
            success: true as const,
        };
    }

    const phone =
        result.data.phone.replace(/\D/g, "");

    try {
        const oneMinuteAgo = new Date(
            Date.now() - 60 * 1000
        );

        const existingRequest =
            await prisma.contactRequest.findFirst({
                where: {
                    phone,
                    createdAt: {
                        gte: oneMinuteAgo,
                    },
                },
            });

        if (existingRequest) {
            return {
                success: false as const,
                errors: {
                    form: "Похожая заявка уже была отправлена. Попробуйте позже.",
                },
            };
        }

        const contactRequest =
            await prisma.contactRequest.create({
                data: {
                    type: result.data.type,

                    name: result.data.name,

                    phone,

                    callbackTime:
                        result.data.callbackTime,

                    serviceId:
                        result.data.serviceId || null,

                    comment:
                        result.data.comment || null,
                },
            });

        return {
            success: true as const,
            data: contactRequest,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false as const,
            errors: {
                form: "Ошибка при создании обращения",
            },
        };
    }
}