"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createService } from "@/app/admin/(protected)/services/actions/createService";
import { updateService } from "@/app/admin/(protected)/services/actions/updateService";

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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
}


interface Props {
    categories: Category[];

    service?: ServiceData;
}


export function ServiceForm({
    categories,
    service,
}: Props) {

    const isEdit = Boolean(service);


    const form = useForm<ServiceSchema>({
        resolver: zodResolver(serviceSchema),

        defaultValues: {

            categoryId:
                service?.categoryId ?? "",

            name:
                service?.name ?? "",

            slug:
                service?.slug ?? "",

            h1:
                service?.h1 ?? "",

            shortDescription:
                service?.shortDescription ?? "",

            description:
                service?.description ?? "",

            price:
                service?.price ?? "",

            duration:
                service?.duration ?? "",

            seoTitle:
                service?.seoTitle ?? "",

            seoDescription:
                service?.seoDescription ?? "",

            seoKeywords:
                service?.seoKeywords ?? "",

            isPublished:
                service?.isPublished ?? true,

            sortOrder:
                service?.sortOrder ?? 0,
        },
    });


    async function onSubmit(
        data: ServiceSchema
    ) {

        if (isEdit && service) {

            const result =
                await updateService(
                    service.id,
                    data
                );


            if (!result.success) {
                console.log(result.errors);
                return;
            }


            window.location.href =
                "/admin/services";

            return;
        }


        const result =
            await createService(data);


        if (!result.success) {
            console.log(result.errors);
            return;
        }


        window.location.href =
            `/admin/services/${result.data.id}/edit`;
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
                    onSubmit={
                        form.handleSubmit(onSubmit)
                    }
                    className="space-y-4"
                >

                    <Select
                        defaultValue={
                            service?.categoryId
                        }

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

                            <SelectValue
                                placeholder="Выберите категорию"
                            />

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


                    <Input
                        placeholder="Название услуги"
                        {...form.register("name")}
                    />


                    <Input
                        placeholder="Slug"
                        {...form.register("slug")}
                    />


                    <Input
                        placeholder="Цена"
                        {...form.register("price")}
                    />


                    <Input
                        placeholder="Продолжительность"
                        {...form.register("duration")}
                    />


                    <Button type="submit">

                        {isEdit
                            ? "Сохранить изменения"
                            : "Создать услугу"}

                    </Button>


                </form>

            </CardContent>

        </Card>
    );
}