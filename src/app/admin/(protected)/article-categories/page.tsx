import { prisma } from "@/server/db/prisma";

import { CategoriesTable } from "@/components/admin/article-categories/CategoriesTable";

export default async function ArticleCategoriesPage() {
    const categories =
        await prisma.articleCategory.findMany({
            orderBy: {
                sortOrder: "asc",
            },

            include: {
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
        });

    return (
        <CategoriesTable
            categories={categories}
        />
    );
}