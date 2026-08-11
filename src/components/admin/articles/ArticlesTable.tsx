import Link from "next/link";

import type { Prisma } from "@/generated/prisma/client";

import { DeleteArticleButton } from "./components/DeleteArticleButton";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Article = Prisma.ArticleGetPayload<{
    include: {
        category: true;
    };
}>;

interface Props {
    articles: Article[];
}

export function ArticlesTable({
    articles,
}: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Статьи
                </CardTitle>

                <Button asChild>
                    <Link href="/admin/articles/new">
                        Добавить
                    </Link>
                </Button>
            </CardHeader>

            <CardContent>
                <table className="w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-3">
                                Заголовок
                            </th>

                            <th>
                                Категория
                            </th>

                            <th>
                                Slug
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
                        {articles.map((article) => (
                            <tr
                                key={article.id}
                                className="border-b"
                            >
                                <td className="py-3">
                                    {article.title}
                                </td>

                                <td>
                                    {article.category.name}
                                </td>

                                <td>
                                    {article.slug}
                                </td>

                                <td>
                                    {article.sortOrder}
                                </td>

                                <td>
                                    {article.isPublished ? (
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
                                        article.updatedAt
                                    )}
                                </td>

                                <td className="flex gap-2 py-3">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Link
                                            href={`/admin/articles/${article.id}/edit`}
                                        >
                                            Изменить
                                        </Link>
                                    </Button>

                                    <DeleteArticleButton
                                        id={article.id}
                                    />
                                </td>
                            </tr>
                        ))}

                        {articles.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    Статей пока нет.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}