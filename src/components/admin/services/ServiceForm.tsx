"use client";

import { useState } from "react";
import {
    useForm,
    useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createService } from "@/app/admin/(protected)/services/actions/createService";
import { updateService } from "@/app/admin/(protected)/services/actions/updateService";
import type { ServiceListSchema } from "@/lib/validations/serviceList";
import {
    serviceSchema,
    type ServiceSchema,
} from "@/lib/validations/service";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { deleteServiceList } from "@/app/admin/(protected)/services/actions/deleteServiceList";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ServiceListSection } from "./ServiceListSection";
import { ServiceListForm } from "./ServiceListForm";
import { updateServiceListOrder } from "@/app/admin/(protected)/services/actions/updateServiceListOrder";
import { updateServiceList } from "@/app/admin/(protected)/services/actions/updateServiceList";
import { createServiceList } from "@/app/admin/(protected)/services/actions/createServiceList";
interface Category {
    id: string;
    name: string;
}
type ServiceListItem = {
    id: string;
    type:
    | "BENEFIT"
    | "INDICATION"
    | "CONTRAINDICATION"
    | "RECOMMENDATION"
    | "STAGE";
    title: string | null;
    text: string;
    sortOrder: number;
};
interface ServiceData {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    h1: string | null;
    shortDescription: string | null;
    description: string | null;
    price: string | null;
    duration: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    seoKeywords: string | null;
    isPublished: boolean;
    sortOrder: number;
    lists: ServiceListItem[];
}

interface Props {
    categories: Category[];
    service?: ServiceData;
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
        <p className="text-sm font-medium text-destructive">
            {message}
        </p>
    );
}

export function ServiceForm({
    categories,
    service,
}: Props) {
    const isEdit = Boolean(service);
    const router = useRouter();
    const [serverFormError, setServerFormError] =
        useState<string | null>(null);
    const [lists, setLists] = useState<ServiceListItem[]>(
        service?.lists ?? []
    ); const [activeListType, setActiveListType] =
        useState<
            | "BENEFIT"
            | "INDICATION"
            | "CONTRAINDICATION"
            | "RECOMMENDATION"
            | "STAGE"
            | null
        >(null);
    const [editingList, setEditingList] =
        useState<ServiceListItem | null>(null);
    const form = useForm<ServiceSchema>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            categoryId: service?.categoryId ?? "",
            name: service?.name ?? "",
            slug: service?.slug ?? "",
            h1: service?.h1 ?? "",
            shortDescription: service?.shortDescription ?? "",
            description: service?.description ?? "",
            price: service?.price ?? "",
            duration: service?.duration ?? "",
            seoTitle: service?.seoTitle ?? "",
            seoDescription: service?.seoDescription ?? "",
            seoKeywords: service?.seoKeywords ?? "",
            isPublished: service?.isPublished ?? true,
            sortOrder: service?.sortOrder ?? 0,
        },
    });
    const categoryId = useWatch({
        control: form.control,
        name: "categoryId",
    });

    const isPublished = useWatch({
        control: form.control,
        name: "isPublished",
    });

    async function handleCreateList(
        data: ServiceListSchema
    ) {
        if (!service) return;

        const result = await createServiceList(data);

        if (!result.success || !result.data) {
            console.error(result.errors);
            return;
        }

        setLists((prev) => [
            ...prev,
            result.data,
        ]);

        setActiveListType(null);
    }
    async function handleDeleteList(id: string) {
        const result = await deleteServiceList(id);

        if (!result.success) {
            console.error(result.errors);
            return;
        }

        setLists((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        );

        setEditingList(null);
    }
    async function handleUpdateList(
        data: ServiceListSchema
    ) {
        if (!editingList) return;

        const result = await updateServiceList(
            editingList.id,
            data
        );

        if (!result.success || !result.data) {
            console.error(result.errors);
            return;
        }

        setLists((prev) =>
            prev.map((item) =>
                item.id === result.data.id
                    ? result.data
                    : item
            )
        );

        setEditingList(null);
    }
async function handleReorderLists(
    updatedItems: ServiceListItem[]
) {
    setLists((prev) =>
        prev.map((item) => {
            const updatedItem = updatedItems.find(
                (updated) =>
                    updated.id === item.id
            );

            return updatedItem ?? item;
        })
    );

    await updateServiceListOrder(
        updatedItems.map((item) => ({
            id: item.id,
            sortOrder: item.sortOrder,
        }))
    );
}    async function onSubmit(data: ServiceSchema) {
        setServerFormError(null);

        if (isEdit && service) {
            const result = await updateService(service.id, data);

            if (!result.success) {
                const formError =
                    result.errors && "form" in result.errors
                        ? result.errors.form
                        : null;

                if (formError) {
                    setServerFormError(formError);
                }

                return;
            }

            router.push("/admin/services");
            return;
        }

        const result = await createService(data);

        if (!result.success) {
            const formError =
                result.errors && "form" in result.errors
                    ? result.errors.form
                    : null;
            if (formError) {
                setServerFormError(formError);
            }
            return;
        }
        router.push(
            `/admin/services/${result.data.id}/edit`
        );
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isEdit
                        ? "Редактирование услуги"
                        : "Новая услуга"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-base font-medium">
                                Основная информация
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Базовые данные услуги для админки и публичной страницы.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Категория
                                </label>

                                <Select
                                    value={categoryId}
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
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <ValidationError
                                    message={
                                        form.formState.errors.categoryId
                                            ?.message
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Порядок сортировки
                                </label>

                                <Input
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    {...form.register("sortOrder")}
                                />

                                <ValidationError
                                    message={
                                        form.formState.errors.sortOrder
                                            ?.message
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Название услуги
                                </label>

                                <Input
                                    placeholder="Например: Лечение кариеса"
                                    {...form.register("name")}
                                />

                                <ValidationError
                                    message={
                                        form.formState.errors.name?.message
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Slug
                                </label>

                                <Input
                                    placeholder="lechenie-kariesa"
                                    {...form.register("slug")}
                                />

                                <ValidationError
                                    message={
                                        form.formState.errors.slug?.message
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                H1
                            </label>

                            <Input
                                placeholder="Лечение кариеса в клинике Теймурова"
                                {...form.register("h1")}
                            />

                            <ValidationError
                                message={
                                    form.formState.errors.h1?.message
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Краткое описание
                            </label>

                            <Textarea
                                placeholder="Короткое описание услуги для карточек и первого экрана."
                                className="min-h-24"
                                {...form.register("shortDescription")}
                            />

                            <ValidationError
                                message={
                                    form.formState.errors
                                        .shortDescription?.message
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Полное описание
                            </label>

                            <Textarea
                                placeholder="Подробное экспертное описание услуги."
                                className="min-h-40"
                                {...form.register("description")}
                            />

                            <ValidationError
                                message={
                                    form.formState.errors.description
                                        ?.message
                                }
                            />
                        </div>
                    </section>

                    <section className="space-y-4 border-t pt-6">
                        <div>
                            <h2 className="text-base font-medium">
                                Стоимость и длительность
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Цена хранится текстом, чтобы поддерживать форматы “от 5 000 ₽” и “После консультации”.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Цена
                                </label>

                                <Input
                                    placeholder="от 5 000 ₽"
                                    {...form.register("price")}
                                />

                                <ValidationError
                                    message={
                                        form.formState.errors.price?.message
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Продолжительность
                                </label>

                                <Input
                                    placeholder="30–60 минут"
                                    {...form.register("duration")}
                                />

                                <ValidationError
                                    message={
                                        form.formState.errors.duration
                                            ?.message
                                    }
                                />
                            </div>
                        </div>
                    </section>
                    {isEdit && service && (
                        <>
                            <ServiceListSection
                                title="Преимущества"
                                description="Основные преимущества услуги."
                                items={lists.filter(
                                    (item) => item.type === "BENEFIT"
                                )}
                                onAdd={() => {
                                    setEditingList(null);
                                    setActiveListType("BENEFIT");
                                }}
                                onReorder={handleReorderLists}
                                onEdit={(item) => {
                                    setActiveListType(null);
                                    setEditingList(item);
                                }}
                                onDelete={handleDeleteList}                            >
                                {(activeListType === "BENEFIT" ||
                                    editingList?.type === "BENEFIT") && (
                                        <ServiceListForm
                                            defaultValues={
                                                editingList
                                                    ? {
                                                        serviceId: service.id,
                                                        type: editingList.type,
                                                        title: editingList.title ?? "",
                                                        text: editingList.text,
                                                        sortOrder: editingList.sortOrder,
                                                    }
                                                    : {
                                                        serviceId: service.id,
                                                        type: "BENEFIT",
                                                    }
                                            }
                                            showTitle
                                            onSubmit={
                                                editingList
                                                    ? handleUpdateList
                                                    : handleCreateList
                                            }
                                            onCancel={() => {
                                                setActiveListType(null);
                                                setEditingList(null);
                                            }}
                                        />
                                    )}
                            </ServiceListSection>


                            <ServiceListSection
                                title="Показания"
                                description="Когда рекомендуется процедура."
                                items={lists.filter(
                                    (item) => item.type === "INDICATION"
                                )}
                                onAdd={() => {
                                    setEditingList(null);
                                    setActiveListType("INDICATION");
                                }}
                                onReorder={handleReorderLists}
                                onEdit={(item) => {
                                    setActiveListType(null);
                                    setEditingList(item);
                                }}
                                onDelete={handleDeleteList}                            >
                                {(activeListType === "INDICATION" ||
                                    editingList?.type === "INDICATION") && (
                                        <ServiceListForm
                                            defaultValues={
                                                editingList
                                                    ? {
                                                        serviceId: service.id,
                                                        type: editingList.type,
                                                        title: editingList.title ?? "",
                                                        text: editingList.text,
                                                        sortOrder: editingList.sortOrder,
                                                    }
                                                    : {
                                                        serviceId: service.id,
                                                        type: "INDICATION",
                                                    }
                                            }
                                            showTitle
                                            onSubmit={
                                                editingList
                                                    ? handleUpdateList
                                                    : handleCreateList
                                            }
                                            onCancel={() => {
                                                setActiveListType(null);
                                                setEditingList(null);
                                            }}
                                        />
                                    )}
                            </ServiceListSection>


                            <ServiceListSection
                                title="Противопоказания"
                                description="Когда процедуру нельзя проводить."
                                items={lists.filter(
                                    (item) =>
                                        item.type === "CONTRAINDICATION"
                                )}
                                onAdd={() => {
                                    setEditingList(null);
                                    setActiveListType("CONTRAINDICATION");
                                }}
                                onReorder={handleReorderLists}
                                onEdit={(item) => {
                                    setActiveListType(null);
                                    setEditingList(item);
                                }}
                                onDelete={handleDeleteList}                            >
                                {(activeListType === "CONTRAINDICATION" ||
                                    editingList?.type === "CONTRAINDICATION") && (
                                        <ServiceListForm
                                            defaultValues={
                                                editingList
                                                    ? {
                                                        serviceId: service.id,
                                                        type: editingList.type,
                                                        title: editingList.title ?? "",
                                                        text: editingList.text,
                                                        sortOrder: editingList.sortOrder,
                                                    }
                                                    : {
                                                        serviceId: service.id,
                                                        type: "CONTRAINDICATION",
                                                    }
                                            }
                                            showTitle
                                            onSubmit={
                                                editingList
                                                    ? handleUpdateList
                                                    : handleCreateList
                                            }
                                            onCancel={() => {
                                                setActiveListType(null);
                                                setEditingList(null);
                                            }}
                                        />
                                    )}
                            </ServiceListSection>


                            <ServiceListSection
                                title="Этапы лечения"
                                description="Последовательность выполнения процедуры."
                                items={lists.filter(
                                    (item) => item.type === "STAGE"
                                )}
                                onAdd={() => {
                                    setEditingList(null);
                                    setActiveListType("STAGE");
                                }}
                                onReorder={handleReorderLists}
                                onEdit={(item) => {
                                    setActiveListType(null);
                                    setEditingList(item);
                                }}
                                onDelete={handleDeleteList}                            >
                                {(activeListType === "STAGE" ||
                                    editingList?.type === "STAGE") && (
                                        <ServiceListForm
                                            defaultValues={
                                                editingList
                                                    ? {
                                                        serviceId: service.id,
                                                        type: editingList.type,
                                                        title: editingList.title ?? "",
                                                        text: editingList.text,
                                                        sortOrder: editingList.sortOrder,
                                                    }
                                                    : {
                                                        serviceId: service.id,
                                                        type: "STAGE",
                                                    }
                                            }
                                            showTitle
                                            onSubmit={
                                                editingList
                                                    ? handleUpdateList
                                                    : handleCreateList
                                            }
                                            onCancel={() => {
                                                setActiveListType(null);
                                                setEditingList(null);
                                            }}
                                        />
                                    )}
                            </ServiceListSection>


                            <ServiceListSection
                                title="Рекомендации"
                                description="Рекомендации после процедуры."
                                items={lists.filter(
                                    (item) =>
                                        item.type === "RECOMMENDATION"
                                )}
                                onAdd={() => {
                                    setEditingList(null);
                                    setActiveListType("RECOMMENDATION");
                                }}
                                onReorder={handleReorderLists}
                                onEdit={(item) => {
                                    setActiveListType(null);
                                    setEditingList(item);
                                }}
                                onDelete={handleDeleteList}                            >
                                {(activeListType === "RECOMMENDATION" ||
                                    editingList?.type === "RECOMMENDATION") && (
                                        <ServiceListForm
                                            defaultValues={
                                                editingList
                                                    ? {
                                                        serviceId: service.id,
                                                        type: editingList.type,
                                                        title: editingList.title ?? "",
                                                        text: editingList.text,
                                                        sortOrder: editingList.sortOrder,
                                                    }
                                                    : {
                                                        serviceId: service.id,
                                                        type: "RECOMMENDATION",
                                                    }
                                            }
                                            showTitle
                                            onSubmit={
                                                editingList
                                                    ? handleUpdateList
                                                    : handleCreateList
                                            }
                                            onCancel={() => {
                                                setActiveListType(null);
                                                setEditingList(null);
                                            }}
                                        />
                                    )}
                            </ServiceListSection>
                        </>)}
                    <section className="space-y-4 border-t pt-6">
                        <div>
                            <h2 className="text-base font-medium">
                                SEO
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Метаданные для поисковых систем и сниппетов.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                SEO Title
                            </label>

                            <Input
                                placeholder="Лечение кариеса в Москве — стоматология Теймурова"
                                {...form.register("seoTitle")}
                            />

                            <ValidationError
                                message={
                                    form.formState.errors.seoTitle
                                        ?.message
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                SEO Description
                            </label>

                            <Textarea
                                placeholder="Краткое описание страницы для поисковой выдачи."
                                className="min-h-24"
                                {...form.register("seoDescription")}
                            />

                            <ValidationError
                                message={
                                    form.formState.errors.seoDescription
                                        ?.message
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                SEO Keywords
                            </label>

                            <Input
                                placeholder="лечение кариеса, стоматология, кариес цена"
                                {...form.register("seoKeywords")}
                            />

                            <ValidationError
                                message={
                                    form.formState.errors.seoKeywords
                                        ?.message
                                }
                            />
                        </div>
                    </section>

                    <section className="space-y-4 border-t pt-6">
                        <div>
                            <h2 className="text-base font-medium">
                                Публикация
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Черновики не должны отображаться на публичном сайте.
                            </p>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">
                                    Опубликовано
                                </label>

                                <p className="text-sm text-muted-foreground">
                                    Услуга доступна на сайте.
                                </p>
                            </div>

                            <Switch
                                checked={isPublished}
                                onCheckedChange={(checked) =>
                                    form.setValue(
                                        "isPublished",
                                        checked,
                                        {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        }
                                    )
                                }
                            />
                        </div>
                    </section>

                    {serverFormError && (
                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                            {serverFormError}
                        </div>
                    )}

                    <Button type="submit">
                        {isEdit
                            ? "Сохранить изменения"
                            : "Продолжить"}
                    </Button>
                </form>
            </CardContent>
        </Card >
    );
}