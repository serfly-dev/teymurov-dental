"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

export function ContactRequestsSearch() {
    const router = useRouter();

    const searchParams =
        useSearchParams();

    const [value, setValue] =
        useState(
            searchParams.get("search") ?? ""
        );

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params =
                new URLSearchParams(
                    searchParams.toString()
                );

            if (value.trim()) {
                params.set(
                    "search",
                    value
                );
            } else {
                params.delete(
                    "search"
                );
            }

            router.push(
                `/admin/contact-requests?${params.toString()}`
            );

        }, 300);

        return () =>
            clearTimeout(timeout);

    }, [
        value,
        router,
        searchParams,
    ]);

    return (
        <Input
            placeholder="Поиск по имени, телефону или комментарию..."
            value={value}
            onChange={(event) =>
                setValue(
                    event.target.value
                )
            }
            className="w-80"
        />
    );
}