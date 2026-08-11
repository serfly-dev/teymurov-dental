"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    useForm,
    useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    articleCategorySchema,
    type ArticleCategorySchema,
} from "@/lib/validations/articleCategory";

import { generateSlug } from "@/lib/utils/slugify";

import { createCategory } from "@/app/admin/(protected)/article-categories/actions/createCategory";
import { updateCategory } from "@/app/admin/(protected)/article-categories/actions/updateCategory";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
    category?: {
        id: string;
        name: string;
        slug: string;
        sortOrder: number;
    };
}

function ValidationError({
    message,
}: {
    message?: string;
}) {
    if (!message) {
        return null;
    }

    return (
        <p className="text-sm text-destructive">
            {message}
        </p>
    );
}

export function CategoryForm({
    category,
}: Props) {
    const router = useRouter();

    const isEdit = Boolean(category);

    const [serverError, setServerError] =
        useState<string | null>(null);

    const form =
        useForm<ArticleCategorySchema>({
            resolver: zodResolver(
                articleCategorySchema
            ),

            defaultValues: {
                name: category?.name ?? "",
                slug: category?.slug ?? "",
                sortOrder:
                    category?.sortOrder ?? 0,
            },
        });

    const name = useWatch({
        control: form.control,
        name: "name",
    });

    useEffect(() => {
        if (!category && name) {
            form.setValue(
                "slug",
                generateSlug(name),
                {
                    shouldValidate: true,
                }
            );
        }
    }, [
        category,
        form,
        name,
    ]);

    async function onSubmit(
        data: ArticleCategorySchema
    ) {
        setServerError(null);

        if (isEdit && category) {
            const result =
                await updateCategory(
                    category.id,
                    data
                );

            if (!result.success) {
                const error =
                    result.errors &&
                    "form" in result.errors
                        ? result.errors.form?.[0]
                        : null;

                setServerError(error ?? null);

                return;
            }

            router.push(
                "/admin/article-categories"
            );

            return;
        }

        const result =
            await createCategory(data);

        if (!result.success) {
            const error =
                result.errors &&
                "form" in result.errors
                    ? result.errors.form?.[0]
                    : null;

            setServerError(error ?? null);

            return;
        }

        router.push(
            "/admin/article-categories"
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isEdit
                        ? "Редактирование категории"
                        : "Новая категория"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={form.handleSubmit(
                        onSubmit
                    )}
                    className="space-y-6"
                >
                    <div>
                        <label>
                            Название
                        </label>

                        <Input
                            {...form.register(
                                "name"
                            )}
                        />

                        <ValidationError
                            message={
                                form.formState.errors
                                    .name?.message
                            }
                        />
                    </div>

                    <div>
                        <label>
                            Slug
                        </label>

                        <Input
                            {...form.register(
                                "slug"
                            )}
                        />

                        <ValidationError
                            message={
                                form.formState.errors
                                    .slug?.message
                            }
                        />
                    </div>

                    <div>
                        <label>
                            Порядок сортировки
                        </label>

                        <Input
                            type="number"
                            {...form.register(
                                "sortOrder"
                            )}
                        />

                        <ValidationError
                            message={
                                form.formState.errors
                                    .sortOrder
                                    ?.message
                            }
                        />
                    </div>

                    {serverError && (
                        <p className="text-sm text-destructive">
                            {serverError}
                        </p>
                    )}

                    <Button type="submit">
                        {isEdit
                            ? "Сохранить"
                            : "Создать"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}