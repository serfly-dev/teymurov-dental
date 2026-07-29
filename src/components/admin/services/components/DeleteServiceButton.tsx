"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { deleteService } from "@/app/admin/(protected)/services/actions/deleteService";

interface Props {
    id: string;
}

export function DeleteServiceButton({
    id,
}: Props) {
    const [pending, startTransition] = useTransition();

    function handleDelete() {
        const confirmed = window.confirm(
            "Вы действительно хотите удалить услугу?"
        );

        if (!confirmed) {
            return;
        }

        startTransition(async () => {
            const result = await deleteService(id);

            if (!result.success) {
                alert(result.errors?.form);
                return;
            }

            window.location.reload();
        });
    }

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={pending}
        >
            {pending
                ? "Удаление..."
                : "Удалить"}
        </Button>
    );
}