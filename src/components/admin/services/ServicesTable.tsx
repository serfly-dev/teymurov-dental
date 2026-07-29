import Link from "next/link";

import { DeleteServiceButton } from "./components/DeleteServiceButton";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type { Prisma } from "@/generated/prisma/client";

type Service = Prisma.ServiceGetPayload<{
    include: {
        category: true;

        _count: {
            select: {
                faqs: true;
                blocks: true;
                images: true;
            };
        };
    };
}>;

interface ServicesTableProps {
    services: Service[];
}

export function ServicesTable({
    services,
}: ServicesTableProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Услуги
                </CardTitle>

                <Button asChild>
                    <Link href="/admin/services/new">
                        Добавить
                    </Link>
                </Button>
            </CardHeader>

            <CardContent>
                <table className="w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-3">
                                Название
                            </th>

                            <th>
                                Категория
                            </th>

                            <th>
                                Цена
                            </th>

                            <th>
                                Блоки
                            </th>

                            <th>
                                FAQ
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
                        {services.map((service) => (
                            <tr
                                key={service.id}
                                className="border-b"
                            >
                                <td className="py-3">
                                    {service.name}
                                </td>

                                <td>
                                    {service.category.name}
                                </td>

                                <td>
                                    {service.price ?? "—"}
                                </td>

                                <td>
                                    {service._count.blocks}
                                </td>

                                <td>
                                    {service._count.faqs}
                                </td>

                                <td>
                                    {service.seoTitle &&
                                    service.seoDescription
                                        ? "Заполнено"
                                        : "Нет"}
                                </td>

                                <td>
                                    {service.isPublished
                                        ? "Опубликована"
                                        : "Черновик"}
                                </td>

                                <td>
                                    {new Intl.DateTimeFormat(
                                        "ru-RU"
                                    ).format(
                                        service.updatedAt
                                    )}
                                </td>

                                <td className="flex gap-2 py-3">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Link
                                            href={`/admin/services/${service.id}/edit`}
                                        >
                                            Изменить
                                        </Link>
                                    </Button>

                                    <DeleteServiceButton
                                        id={service.id}
                                    />
                                </td>
                            </tr>
                        ))}

                        {services.length === 0 && (
                            <tr>
                                <td
                                    colSpan={9}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    Услуг пока нет.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}