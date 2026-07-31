import { notFound } from "next/navigation";

import { prisma } from "@/server/db/prisma";
import { DoctorForm } from "@/components/admin/doctors/DoctorForm";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditDoctorPage({
    params,
}: Props) {
    const { id } = await params;

    const doctor = await prisma.doctor.findUnique({
        where: {
            id,
        },

        include: {
            services: {
                select: {
                    serviceId: true,
                },
            },

            certificates: {
                orderBy: {
                    sortOrder: "asc",
                },
            },
        },
    });
    if (!doctor) {
        notFound();
    }

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
            doctor={doctor}
        />
    );
}