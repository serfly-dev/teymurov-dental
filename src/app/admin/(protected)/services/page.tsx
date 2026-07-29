import { prisma } from "@/server/db/prisma";
import { ServicesTable } from "@/components/admin/services/ServicesTable";

export default async function ServicesPage() {
    const services = await prisma.service.findMany({
        orderBy: {
            sortOrder: "asc",
        },

        include: {
            category: true,

            _count: {
                select: {
                    faqs: true,
                    blocks: true,
                    images: true,
                },
            },
        },
    });

    return (
        <ServicesTable services={services} />
    );
}