import { prisma } from "@/server/db/prisma";

import { ArticlesTable } from "@/components/admin/articles/ArticlesTable";

export default async function ArticlesPage() {
    const articles =
        await prisma.article.findMany({
            include: {
                category: true,
            },

            orderBy: [
                {
                    sortOrder: "asc",
                },
                {
                    updatedAt: "desc",
                },
            ],
        });

    return (
        <ArticlesTable
            articles={articles}
        />
    );
}