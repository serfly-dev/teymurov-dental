import { ContactRequestsTable } from "@/components/admin/contact-requests/ContactRequestsTable"; import { prisma } from "@/server/db/prisma";

export default async function ContactRequestsPage({
    searchParams,
}: {
    searchParams: Promise<{
        sort?: string;
        order?: string;
        search?: string;
    }>;
}) {
    const params =
        await searchParams;

    const sort =
        params.sort ?? "createdAt";

    const order =
        params.order === "asc"
            ? "asc"
            : "desc";
    const search =
        params.search?.trim() ?? "";
    const phoneSearch =
        search.replace(/\D/g, "");
    const contactRequests =
        await prisma.contactRequest.findMany({

            where:
                search
                    ? {
                        OR: [
                            {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                            {
                                phone: {
                                    startsWith: phoneSearch || search,
                                },
                            }, {
                                comment: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        ],
                    }
                    : undefined,
            orderBy: {
                [sort]: order,
            },
            include: {
                service: true,
            },
        });

    return (
        <ContactRequestsTable
            contactRequests={contactRequests}
        />
    );
}