"use server";

import { prisma } from "@/server/db/prisma";

interface ItemOrder {
    id: string;
    sortOrder: number;
}

export async function updateServiceListOrder(
    items: ItemOrder[]
) {
    try {
        await prisma.$transaction(
            items.map((item) =>
                prisma.serviceList.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        sortOrder:
                            item.sortOrder,
                    },
                })
            )
        );

        return {
            success: true,
        };
    } catch {
        return {
            success: false,
            error: "Не удалось сохранить порядок",
        };
    }
}