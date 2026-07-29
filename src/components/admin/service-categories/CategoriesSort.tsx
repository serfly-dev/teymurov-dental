"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";

export function CategoriesSort() {
    const router = useRouter();
    const params = useSearchParams();

    function handleSort(value: string) {
        const url = new URLSearchParams(params);

        if (value) {
            url.set("sort", value);
        } else {
            url.delete("sort");
        }

        router.push(
            `/admin/service-categories?${url.toString()}`
        );
    }

    return (
        <Select
            defaultValue={
                params.get("sort") ?? "sortOrder"
            }
            onValueChange={handleSort}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="sortOrder">
                    По порядку
                </SelectItem>

                <SelectItem value="name">
                    По названию
                </SelectItem>

                <SelectItem value="services">
                    По количеству услуг
                </SelectItem>
            </SelectContent>
        </Select>
    );
}