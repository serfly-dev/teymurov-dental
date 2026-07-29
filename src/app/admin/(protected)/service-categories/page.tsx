import { prisma } from "@/server/db/prisma";
import { CategoriesTable } from "@/components/admin/service-categories/CategoriesTable";

interface Props {
    searchParams: Promise<{
        search?: string;
        sort?: string;
    }>;
}

export default async function ServiceCategoriesPage({
    searchParams,
}: Props) {
    const params = await searchParams;

    const search = params.search ?? "";
    const sort = params.sort ?? "sortOrder";
    const categories = await prisma.serviceCategory.findMany({
        where: search
            ? {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            }
            : undefined,

        orderBy:
            sort === "name"
                ? {
                    name: "asc",
                }
                : sort === "services"
                    ? {
                        services: {
                            _count: "desc",
                        },
                    }
                    : {
                        sortOrder: "asc",
                    },
        include: {
            _count: {
                select: {
                    services: true,
                },
            },
        },
    }); return <CategoriesTable categories={categories} />;
}