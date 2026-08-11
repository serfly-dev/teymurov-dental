import { z } from "zod";

export const articleCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Введите название категории"),

    slug: z
        .string()
        .trim()
        .min(1, "Введите slug")
        .regex(
            /^[a-z0-9-]+$/,
            "Slug может содержать только латинские буквы, цифры и дефис"
        ),

    sortOrder: z.coerce
        .number()
        .min(0),
});

export type ArticleCategorySchema = z.input<
    typeof articleCategorySchema
>;