import { z } from "zod";

export const articleSchema = z.object({
    categoryId: z
        .string()
        .min(1, "Выберите категорию"),

    title: z
        .string()
        .trim()
        .min(1, "Введите название статьи"),

    slug: z
        .string()
        .trim()
        .min(1, "Введите slug")
        .regex(
            /^[a-z0-9-]+$/,
            "Slug может содержать только латинские буквы, цифры и дефис"
        ),

    excerpt: z
        .string()
        .trim()
        .nullable()
        .optional(),

    content: z
        .string()
        .trim()
        .min(1, "Введите текст статьи"),

    image: z
        .string()
        .trim()
        .nullable()
        .optional(),

    h1: z
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

    isPublished: z.boolean(),

    sortOrder: z.coerce
        .number()
        .min(0),
});

export type ArticleSchema =
    z.input<typeof articleSchema>;