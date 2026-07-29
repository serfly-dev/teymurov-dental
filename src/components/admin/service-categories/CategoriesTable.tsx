import Link from "next/link";

import { DeleteCategoryButton } from "./components/DeleteCategoryButton";
import { CategoriesFilters } from "./CategoriesFilters";
import { CategoriesSort } from "./CategoriesSort";
import { Badge } from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type { Prisma } from "@/generated/prisma/client";

type Category = Prisma.ServiceCategoryGetPayload<{
    include: {
        _count: {
            select: {
                services: true;
            };
        };
    };
}>;

interface CategoriesTableProps {
    categories: Category[];
}

export function CategoriesTable({
    categories,
}: CategoriesTableProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>
                    Категории услуг
                </CardTitle>

                <div className="flex items-center gap-3">
                    <CategoriesFilters />
                    <CategoriesSort />
                    <Button asChild>
                        <Link href="/admin/service-categories/new">
                            Добавить
                        </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <table className="w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-3">
                                Название
                            </th>

                            <th>
                                Slug
                            </th>

                            <th>
                                Услуги
                            </th>

                            <th>
                                Сортировка
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
                        {categories.map((category) => (
                            <tr
                                key={category.id}
                                className="border-b"
                            >
                                <td className="py-3">
                                    {category.name}
                                </td>

                                <td>
                                    {category.slug}
                                </td>

                                <td>
                                    {category._count.services}
                                </td>

                                <td>
                                    {category.sortOrder}
                                </td>

                                <td>
                                    {category.isPublished ? (
                                        <Badge>
                                            Опубликована
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary">
                                            Черновик
                                        </Badge>
                                    )}
                                </td>

                                <td>
                                    {new Intl.DateTimeFormat(
                                        "ru-RU"
                                    ).format(
                                        category.updatedAt
                                    )}
                                </td>

                                <td className="flex gap-2 py-3">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Link
                                            href={`/admin/service-categories/${category.id}/edit`}
                                        >
                                            Изменить
                                        </Link>
                                    </Button>

                                    <DeleteCategoryButton
                                        id={category.id}
                                    />
                                </td>
                            </tr>
                        ))}

                        {categories.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    Категорий пока нет.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}