"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function ContactRequestsSort() {
    const router = useRouter();

    const searchParams = useSearchParams();

    const sort =
        searchParams.get("sort") ??
        "createdAt";

    const order =
        searchParams.get("order") ??
        "desc";

    function update(
        newSort: string,
        newOrder: string
    ) {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set("sort", newSort);
        params.set("order", newOrder);

        router.push(
            `/admin/contact-requests?${params.toString()}`
        );
    }

    return (
        <div className="flex gap-4">

            <Select
                value={sort}
                onValueChange={(value) =>
                    update(value, order)
                }
            >
                <SelectTrigger className="w-52">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="createdAt">
                        По дате
                    </SelectItem>

                    <SelectItem value="name">
                        По имени
                    </SelectItem>

                    <SelectItem value="status">
                        По статусу
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={order}
                onValueChange={(value) =>
                    update(sort, value)
                }
            >
                <SelectTrigger className="w-52">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="desc">
                        По убыванию
                    </SelectItem>

                    <SelectItem value="asc">
                        По возрастанию
                    </SelectItem>
                </SelectContent>
            </Select>

        </div>
    );
}