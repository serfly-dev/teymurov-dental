import { z } from "zod";

export const contactRequestSchema = z.object({
    type: z.enum([
        "APPOINTMENT",
        "QUESTION",
    ]),

    name: z
        .string()
        .trim()
        .min(2, "Имя должно содержать минимум 2 символа"),

    phone: z
        .string()
        .transform((value) =>
            value.replace(/\D/g, "")
        )
        .refine(
            (value) => value.length === 11,
            {
                message: "Введите корректный номер телефона",
            }
        ),

    callbackTime: z.enum([
        "MORNING",
        "BEFORE_NOON",
        "AFTERNOON",
        "EVENING",
        "ANYTIME",
    ]),

    serviceId: z
        .string()
        .trim()
        .optional(),

    comment: z
        .string()
        .trim()
        .max(1000, "Комментарий слишком длинный")
        .optional(),
    website: z
        .string()
        .optional(),
});

export type ContactRequestSchema = z.input<typeof contactRequestSchema>;