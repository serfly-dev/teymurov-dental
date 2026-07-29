import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Введите название"),

  slug: z
    .string()
    .trim()
    .min(1, "Введите slug")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug может содержать только латинские буквы, цифры и дефис"
    ),

  description: z
    .string()
    .nullable()
    .optional(),

  sortOrder: z.coerce
    .number()
    .min(0, "Значение не может быть меньше 0"),

  isPublished: z.boolean(),
});

export type CategorySchema = z.input<typeof categorySchema>;
export type CategoryOutput = z.output<typeof categorySchema>;