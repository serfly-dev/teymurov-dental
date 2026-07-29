import { notFound } from "next/navigation";

import { prisma } from "@/server/db/prisma";

import { ServiceForm } from "@/components/admin/services/ServiceForm";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditServicePage({
    params,
}: Props) {
    const { id } = await params;

    const service = await prisma.service.findUnique({
        where: {
            id,
        },

    });

    if (!service) {
        notFound();
    }

    const categories =
        await prisma.serviceCategory.findMany({
            orderBy: {
                sortOrder: "asc",
            },
        });

    return (
        <ServiceForm
            categories={categories}
            service={{
                id: service.id,

                categoryId: service.categoryId,

                name: service.name,

                slug: service.slug,

                h1: service.h1,

                shortDescription:
                    service.shortDescription,

                description:
                    service.description,

                duration:
                    service.duration,

                seoTitle:
                    service.seoTitle,

                seoDescription:
                    service.seoDescription,

                seoKeywords:
                    service.seoKeywords,

                isPublished:
                    service.isPublished,

                sortOrder:
                    service.sortOrder,

                price: service.price,
            }}
        />
    );
}