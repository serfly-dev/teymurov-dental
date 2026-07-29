import { prisma } from "@/server/db/prisma";

import { ServiceForm } from "@/components/admin/services/ServiceForm";

export default async function NewServicePage() {
    const categories = await prisma.serviceCategory.findMany({
        where: {
            isPublished: true,
        },
        orderBy: {
            sortOrder: "asc",
        },
    });

    return (
        <ServiceForm
            categories={categories}
        />
    );
}