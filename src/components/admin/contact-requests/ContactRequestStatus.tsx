"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { updateContactRequestStatus } from "@/app/admin/(protected)/contact-requests/actions/updateContactRequestStatus";

import { CONTACT_REQUEST_STATUS_LABELS } from "./constants";

interface ContactRequestStatusProps {
    id: string;
    status: "NEW" | "CALLED" | "COMPLETED" | "CANCELED";
}

export function ContactRequestStatus({
    id,
    status,
}: ContactRequestStatusProps) {
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    function onChange(
        value: "NEW" | "CALLED" | "COMPLETED" | "CANCELED"
    ) {
        startTransition(async () => {
            await updateContactRequestStatus(
                id,
                value
            );

            router.refresh();
        });
    }

    return (
        <Select
            value={status}
            onValueChange={(value) =>
                onChange(
                    value as ContactRequestStatusProps["status"]
                )
            }
            disabled={isPending}
        >
            <SelectTrigger
                className="w-44"
                disabled={isPending}
            >
                <SelectValue />

                {isPending && (
                    <span className="ml-2 text-xs text-muted-foreground">
                        Сохранение...
                    </span>
                )}
            </SelectTrigger>
            <SelectContent>
                {Object.entries(
                    CONTACT_REQUEST_STATUS_LABELS
                ).map(([value, label]) => (
                    <SelectItem
                        key={value}
                        value={value}
                    >
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}