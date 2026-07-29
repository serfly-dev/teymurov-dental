import { z } from "zod";

export const serviceSchema = z.object({
    categoryId: z
        .string()
        .min(1, "Выберите категорию"),

    name: z
        .string()
        .trim()
        .min(1, "Введите название услуги"),

    slug: z
        .string()
        .trim()
        .min(1, "Введите slug")
        .regex(
            /^[a-z0-9-]+$/,
            "Slug может содержать только латинские буквы, цифры и дефис"
        ),

    h1: z
        .string()
        .trim()
        .nullable()
        .optional(),

    shortDescription: z
        .string()
        .trim()
        .nullable()
        .optional(),

    description: z
        .string()
        .trim()
        .nullable()
        .optional(),

    price: z
        .coerce
        .number()
        .min(0)
        .nullable()
        .optional(),

    duration: z
        .string()
        .trim()
        .nullable()
        .optional(),

    seoTitle: z
        .string()
        .trim()
        .nullable()
        .optional(),

    seoDescription: z
        .string()
        .trim()
        .nullable()
        .optional(),

    seoKeywords: z
        .string()
        .trim()
        .nullable()
        .optional(),

    isPublished: z.boolean(),

    sortOrder: z.coerce
        .number()
        .min(0),
});

export type ServiceSchema = z.input<typeof serviceSchema>;