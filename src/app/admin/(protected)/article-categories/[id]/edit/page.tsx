import { notFound } from "next/navigation";

import { prisma } from "@/server/db/prisma";

import { CategoryForm } from "@/components/admin/article-categories/CategoryForm";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditArticleCategoryPage({
    params,
}: Props) {
    const { id } = await params;

    const category =
        await prisma.articleCategory.findUnique({
            where: {
                id,
            },
        });

    if (!category) {
        notFound();
    }

    return (
        <CategoryForm
            category={category}
        />
    );
}