import Link from "next/link";

import { DeleteDoctorButton } from "./components/DeleteDoctorButton";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type { Prisma } from "@/generated/prisma/client";

type Doctor = Prisma.DoctorGetPayload<{
    include: {
        _count: {
            select: {
                services: true;
            };
        };
    };
}>;

interface DoctorsTableProps {
    doctors: Doctor[];
}

export function DoctorsTable({
    doctors,
}: DoctorsTableProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Врачи
                </CardTitle>

                <Button asChild>
                    <Link href="/admin/doctors/new">
                        Добавить
                    </Link>
                </Button>
            </CardHeader>

            <CardContent>
                <table className="w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-3">
                                Имя
                            </th>

                            <th>
                                Специализация
                            </th>

                            <th>
                                Услуги
                            </th>

                            <th>
                                SEO
                            </th>

                            <th>
                                Статус
                            </th>

                            <th>
                                Обновлено
                            </th>

                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {doctors.map((doctor) => (
                            <tr
                                key={doctor.id}
                                className="border-b"
                            >
                                <td className="py-3">
                                    {doctor.fullName}
                                </td>

                                <td>
                                    {doctor.specialization}
                                </td>

                                <td>
                                    {doctor._count.services}
                                </td>

                                <td>
                                    {doctor.seoTitle &&
                                    doctor.seoDescription
                                        ? "Заполнено"
                                        : "Нет"}
                                </td>

                                <td>
                                    {doctor.isPublished
                                        ? "Опубликован"
                                        : "Черновик"}
                                </td>

                                <td>
                                    {new Intl.DateTimeFormat(
                                        "ru-RU"
                                    ).format(
                                        doctor.updatedAt
                                    )}
                                </td>

                                <td className="flex gap-2 py-3">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Link
                                            href={`/admin/doctors/${doctor.id}`}
                                        >
                                            Изменить
                                        </Link>
                                    </Button>

                                    <DeleteDoctorButton
                                        id={doctor.id}
                                    />
                                </td>
                            </tr>
                        ))}

                        {doctors.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    Врачей пока нет.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}