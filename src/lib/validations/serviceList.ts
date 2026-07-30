import { z } from "zod";

export const serviceListSchema = z.object({
    serviceId: z.string().cuid(),

    type: z.enum([
        "BENEFIT",
        "INDICATION",
        "CONTRAINDICATION",
        "RECOMMENDATION",
        "STAGE",
    ]),

    title: z
        .string()
        .trim()
        .max(255)
        .optional()
        .or(z.literal("")),

    text: z
        .string()
        .trim()
        .min(1, "Введите текст")
        .max(500),

    sortOrder: z.coerce
        .number()
        .int()
        .min(0),
});

export type ServiceListSchema = z.input<
    typeof serviceListSchema
>;