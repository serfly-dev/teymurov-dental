import { prisma } from "@/server/db/prisma";

import { ArticleForm } from "@/components/admin/articles/ArticleForm";

export default async function NewArticlePage() {
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
        />
    );
}