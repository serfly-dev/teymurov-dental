import { z } from "zod";

export const doctorSchema = z.object({
    fullName: z
        .string()
        .min(2, "Имя должно содержать минимум 2 символа"),

    slug: z
        .string()
        .min(2, "Slug обязателен"),

    specialization: z
        .string()
        .min(2, "Специализация обязательна"),

    experience: z
        .string()
        .optional(),

    careerStartYear: z
        .number()
        .int()
        .positive()
        .optional(),

    education: z
        .string()
        .optional(),

    biography: z
        .string()
        .optional(),

    photo: z
        .string()
        .optional(),

    h1: z
        .string()
        .optional(),

    seoTitle: z
        .string()
        .optional(),

    seoDescription: z
        .string()
        .optional(),

    isPublished: z
        .boolean()
        .default(true),

    sortOrder: z
        .number()
        .int()
        .default(0),
});

export type DoctorSchema = z.input<typeof doctorSchema>;