import { prisma } from "@/server/db/prisma";
import { DoctorsTable } from "@/components/admin/doctors/DoctorsTable";

export default async function DoctorsPage() {
    const doctors = await prisma.doctor.findMany({
        orderBy: {
            sortOrder: "asc",
        },

        include: {
            _count: {
                select: {
                    services: true,
                },
            },
        },
    });

    return (
        <DoctorsTable doctors={doctors} />
    );
}