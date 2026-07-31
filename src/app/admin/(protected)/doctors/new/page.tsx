import { prisma } from "@/server/db/prisma";
import { DoctorForm } from "@/components/admin/doctors/DoctorForm";

export default async function NewDoctorPage() {
    const services = await prisma.service.findMany({
        where: {
            isPublished: true,
        },
        orderBy: {
            sortOrder: "asc",
        },
        select: {
            id: true,
            name: true,
        },
    });

    return (
        <DoctorForm
            services={services}
        />
    );
}