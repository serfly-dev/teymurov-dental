import { notFound } from "next/navigation";

import { prisma } from "@/server/db/prisma";

import { ArticleForm } from "@/components/admin/articles/ArticleForm";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditArticlePage({
    params,
}: Props) {
    const { id } = await params;

    const article =
        await prisma.article.findUnique({
            where: {
                id,
            },
        });

    if (!article) {
        notFound();
    }

    const categories =
        await prisma.articleCategory.findMany({
            orderBy: {
                sortOrder: "asc",
            },

            select: {
                id: true,
                name: true,
            },
        });

    return (
        <ArticleForm
            categories={categories}
            article={article}
        />
    );
}