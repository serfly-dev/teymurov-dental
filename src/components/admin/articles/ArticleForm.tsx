"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    useForm,
    useWatch,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    articleSchema,
    type ArticleSchema,
} from "@/lib/validations/article";

import { generateSlug } from "@/lib/utils/slugify";

import { createArticle } from "@/app/admin/(protected)/articles/actions/createArticle";
import { updateArticle } from "@/app/admin/(protected)/articles/actions/updateArticle";

import { ArticleImageUpload } from "./ArticleImageUpload";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Switch } from "@/components/ui/switch";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Category {
    id: string;
    name: string;
}

interface Props {
    categories: Category[];

    article?: {
        id: string;

        categoryId: string;

        title: string;
        slug: string;

        excerpt: string | null;

        content: string;

        image: string | null;

        h1: string | null;

        seoTitle: string | null;
        seoDescription: string | null;

        isPublished: boolean;

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

export function ArticleForm({
    categories,
    article,
}: Props) {

    const router = useRouter();

    const isEdit = Boolean(article);

    const [serverError, setServerError] =
        useState<string | null>(null);

    const form =
        useForm<ArticleSchema>({
            resolver:
                zodResolver(articleSchema),

            defaultValues: {

                categoryId:
                    article?.categoryId ?? "",

                title:
                    article?.title ?? "",

                slug:
                    article?.slug ?? "",

                excerpt:
                    article?.excerpt ?? "",

                content:
                    article?.content ?? "",

                image:
                    article?.image ?? "",

                h1:
                    article?.h1 ?? "",

                seoTitle:
                    article?.seoTitle ?? "",

                seoDescription:
                    article?.seoDescription ?? "",

                isPublished:
                    article?.isPublished ??
                    false,

                sortOrder:
                    article?.sortOrder ?? 0,
            },
        });

    const title = useWatch({
        control: form.control,
        name: "title",
    });

    useEffect(() => {

        if (!article && title) {

            form.setValue(
                "slug",
                generateSlug(title),
                {
                    shouldValidate: true,
                }
            );

        }

    }, [
        article,
        title,
        form,
    ]);

    async function onSubmit(
        data: ArticleSchema
    ) {

        setServerError(null);

        if (isEdit && article) {

            const result =
                await updateArticle(
                    article.id,
                    data
                );

            if (!result.success) {

                const error =
                    result.errors &&
                        "form" in result.errors
                        ? result.errors.form?.[0]
                        : null;

                setServerError(
                    error ?? null
                );

                return;
            }

            router.push(
                "/admin/articles"
            );

            return;
        }

        const result =
            await createArticle(
                data
            );

        if (!result.success) {

            const error =
                result.errors &&
                    "form" in result.errors
                    ? result.errors.form?.[0]
                    : null;

            setServerError(
                error ?? null
            );

            return;
        }

        if (!result.data) {
            return;
        }

        router.push(
            `/admin/articles/${result.data.id}/edit`
        );
    }

    return (

        <Card>

            <CardHeader>

                <CardTitle>
                    {isEdit
                        ? "Редактирование статьи"
                        : "Новая статья"}
                </CardTitle>

            </CardHeader>

            <CardContent>

                <form
                    onSubmit={
                        form.handleSubmit(onSubmit)
                    }
                    className="space-y-8"
                >
                    <section className="space-y-6">

                        <div>
                            <h2 className="text-lg font-semibold">
                                Основная информация
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Основные данные статьи.
                            </p>
                        </div>

                        <div className="space-y-2">

                            <label>
                                Категория
                            </label>

                            <Select
                                value={form.watch(
                                    "categoryId"
                                )}
                                onValueChange={(value) =>
                                    form.setValue(
                                        "categoryId",
                                        value,
                                        {
                                            shouldValidate: true,
                                        }
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите категорию" />
                                </SelectTrigger>

                                <SelectContent>

                                    {categories.map(
                                        (category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        )
                                    )}

                                </SelectContent>

                            </Select>

                            <ValidationError
                                message={
                                    form.formState
                                        .errors
                                        .categoryId
                                        ?.message
                                }
                            />

                        </div>

                        <div className="grid gap-4 md:grid-cols-2">

                            <div className="space-y-2">

                                <label>
                                    Заголовок
                                </label>

                                <Input
                                    {...form.register(
                                        "title"
                                    )}
                                />

                                <ValidationError
                                    message={
                                        form.formState
                                            .errors
                                            .title
                                            ?.message
                                    }
                                />

                            </div>

                            <div className="space-y-2">

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
                                        form.formState
                                            .errors
                                            .slug
                                            ?.message
                                    }
                                />

                            </div>

                        </div>

                        <div className="space-y-2">

                            <label>
                                H1
                            </label>

                            <Input
                                {...form.register(
                                    "h1"
                                )}
                            />

                        </div>

                        <div className="space-y-2">

                            <label>
                                Краткое описание
                            </label>

                            <Textarea
                                className="min-h-24"
                                {...form.register(
                                    "excerpt"
                                )}
                            />

                        </div>

                    </section>

                    <section className="space-y-6 border-t pt-6">

                        <div>

                            <h2 className="text-lg font-semibold">
                                Содержимое статьи
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Основной текст статьи.
                            </p>

                        </div>

                        <div className="space-y-2">

                            <label>
                                Контент
                            </label>

                            <Textarea
                                className="min-h-[400px]"
                                {...form.register(
                                    "content"
                                )}
                            />

                            <ValidationError
                                message={
                                    form.formState
                                        .errors
                                        .content
                                        ?.message
                                }
                            />

                        </div>

                    </section>
                    <section className="space-y-6 border-t pt-6">

                        <div>

                            <h2 className="text-lg font-semibold">
                                Обложка
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Изображение для карточки статьи и страницы.
                            </p>

                        </div>

                        <div className="space-y-2">

                            <label>
                                Обложка статьи
                            </label>

                            <ArticleImageUpload
                                value={
                                    form.watch("image") ?? undefined
                                }
                                onUpload={(url) =>
                                    form.setValue(
                                        "image",
                                        url,
                                        {
                                            shouldValidate: true,
                                        }
                                    )
                                }
                            />
                        </div>

                    </section>

                    <section className="space-y-6 border-t pt-6">

                        <div>

                            <h2 className="text-lg font-semibold">
                                SEO
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Метаданные страницы.
                            </p>

                        </div>

                        <div className="space-y-2">

                            <label>
                                SEO Title
                            </label>

                            <Input
                                {...form.register(
                                    "seoTitle"
                                )}
                            />

                        </div>

                        <div className="space-y-2">

                            <label>
                                SEO Description
                            </label>

                            <Textarea
                                className="min-h-24"
                                {...form.register(
                                    "seoDescription"
                                )}
                            />

                        </div>

                    </section>

                    <section className="space-y-6 border-t pt-6">

                        <div>

                            <h2 className="text-lg font-semibold">
                                Публикация
                            </h2>

                        </div>

                        <div className="space-y-2">

                            <label>
                                Порядок сортировки
                            </label>

                            <Input
                                type="number"
                                {...form.register(
                                    "sortOrder",
                                    {
                                        valueAsNumber: true,
                                    }
                                )}
                            />

                            <ValidationError
                                message={
                                    form.formState
                                        .errors
                                        .sortOrder
                                        ?.message
                                }
                            />

                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">

                            <span>
                                Опубликовано
                            </span>

                            <Switch
                                checked={form.watch(
                                    "isPublished"
                                )}
                                onCheckedChange={(
                                    value
                                ) =>
                                    form.setValue(
                                        "isPublished",
                                        value,
                                        {
                                            shouldValidate: true,
                                        }
                                    )
                                }
                            />

                        </div>

                    </section>

                    {serverError && (
                        <p className="text-sm text-destructive">
                            {serverError}
                        </p>
                    )}

                    <Button
                        type="submit"
                    >
                        {isEdit
                            ? "Сохранить"
                            : "Продолжить"}
                    </Button>

                </form>

            </CardContent>

        </Card>

    );
}