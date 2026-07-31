"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";
import { DoctorCertificates } from "./DoctorCertificates";
import {
    doctorSchema,
    type DoctorSchema,
} from "@/lib/validations/doctor";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { generateSlug } from "@/lib/utils/slugify"; import { createDoctor } from "@/app/admin/(protected)/doctors/actions/createDoctor";
import { updateDoctor } from "@/app/admin/(protected)/doctors/actions/updateDoctor";
import { DoctorServicesSelect } from "./DoctorServicesSelect";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";


interface Service {
    id: string;
    name: string;
}

interface Props {
    services: Service[];

    doctor?: {
        id: string;

        fullName: string;
        slug: string;

        specialization: string;
        experience: string | null;

        careerStartYear: number | null;

        education: string | null;
        biography: string | null;

        photo: string | null;

        h1: string | null;

        seoTitle: string | null;
        seoDescription: string | null;

        isPublished: boolean;
        sortOrder: number;
        certificates?: {
            id: string;
            name: string;
            image: string;
            year: number | null;
        }[];
        services?: {
            serviceId: string;
        }[];
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
export function DoctorForm({
    services,
    doctor,
}: Props) {

    const router = useRouter();

    const isEdit = Boolean(doctor);

    const [serverError, setServerError] =
        useState<string | null>(null);
    const [selectedServices, setSelectedServices] =
        useState<string[]>(
            doctor?.services?.map(
                (item) => item.serviceId
            ) ?? []
        );

    const form = useForm<DoctorSchema>({
        resolver: zodResolver(doctorSchema),

        defaultValues: {
            fullName: doctor?.fullName ?? "",

            slug: doctor?.slug ?? "",

            specialization:
                doctor?.specialization ?? "",

            experience:
                doctor?.experience ?? "",

            careerStartYear:
                doctor?.careerStartYear ?? undefined,

            education:
                doctor?.education ?? "",

            biography:
                doctor?.biography ?? "",

            photo:
                doctor?.photo ?? "",

            h1:
                doctor?.h1 ?? "",

            seoTitle:
                doctor?.seoTitle ?? "",

            seoDescription:
                doctor?.seoDescription ?? "",

            isPublished:
                doctor?.isPublished ?? true,

            sortOrder:
                doctor?.sortOrder ?? 0,
        },
    });
    const fullName = useWatch({
        control: form.control,
        name: "fullName",
    });

    useEffect(() => {
        if (!doctor && fullName) {
            form.setValue(
                "slug",
                generateSlug(fullName),
                {
                    shouldValidate: true,
                }
            );
        }
    }, [
        fullName,
        doctor,
        form,
    ]);

    async function onSubmit(
        data: DoctorSchema
    ) {

        setServerError(null);


        if (isEdit && doctor) {

            const result =
                await updateDoctor(
                    doctor.id,
                    data,
                    selectedServices
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
                "/admin/doctors"
            );

            return;
        }


        const result =
            await createDoctor(
                data,
                selectedServices
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

        if (!result.data) {
            return;
        }

        router.push(
            `/admin/doctors/${result.data.id}`
        );
    }


    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    {isEdit
                        ? "Редактирование врача"
                        : "Новый врач"}
                </CardTitle>

            </CardHeader>


            <CardContent>

                <form
                    onSubmit={
                        form.handleSubmit(onSubmit)
                    }
                    className="space-y-6"
                >

                    <div>
                        <label>
                            ФИО
                        </label>

                        <Input
                            {...form.register(
                                "fullName"
                            )}
                        />

                        <ValidationError
                            message={
                                form.formState.errors.fullName?.message
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
                                form.formState.errors.slug?.message
                            }
                        />

                    </div>


                    <div>
                        <label>
                            Специализация
                        </label>

                        <Input
                            {...form.register(
                                "specialization"
                            )}
                        />

                    </div>


                    <div>
                        <label>
                            Опыт
                        </label>

                        <Input
                            {...form.register(
                                "experience"
                            )}
                        />

                    </div>


                    <div>
                        <label>
                            Год начала карьеры
                        </label>

                        <Input
                            type="number"
                            {...form.register(
                                "careerStartYear",
                                {
                                    valueAsNumber: true,
                                }
                            )}
                        />

                    </div>


                    <div>
                        <label>
                            Образование
                        </label>

                        <Textarea
                            {...form.register(
                                "education"
                            )}
                        />

                    </div>


                    <div>
                        <label>
                            Биография
                        </label>

                        <Textarea
                            className="min-h-32"
                            {...form.register(
                                "biography"
                            )}
                        />

                    </div>


                    <div>
                        <label>
                            Фото URL
                        </label>

                        <Input
                            {...form.register(
                                "photo"
                            )}
                        />

                    </div>


                    <div>
                        <label>
                            H1
                        </label>

                        <Input
                            {...form.register(
                                "h1"
                            )}
                        />

                    </div>


                    <div>
                        <label>
                            SEO Title
                        </label>

                        <Input
                            {...form.register(
                                "seoTitle"
                            )}
                        />

                    </div>


                    <div>
                        <label>
                            SEO Description
                        </label>

                        <Textarea
                            {...form.register(
                                "seoDescription"
                            )}
                        />

                    </div>


                    <div className="flex items-center justify-between border rounded-lg p-4">

                        <span>
                            Опубликован
                        </span>

                        <Switch
                            checked={
                                form.watch(
                                    "isPublished"
                                )
                            }
                            onCheckedChange={
                                (value) =>
                                    form.setValue(
                                        "isPublished",
                                        value
                                    )
                            }
                        />

                    </div>


                    {serverError && (
                        <p className="text-sm text-destructive">
                            {serverError}
                        </p>
                    )}

                    <section className="border-t pt-6">
                        <DoctorServicesSelect
                            services={services}
                            selectedServices={selectedServices}
                            onChange={setSelectedServices}
                        />
                    </section>
                    {doctor && (
                        <DoctorCertificates
                            doctorId={doctor.id}
                            certificates={doctor.certificates ?? []}
                        />
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