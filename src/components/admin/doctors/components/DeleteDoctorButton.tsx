"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { deleteDoctor } from "@/app/admin/(protected)/doctors/actions/deleteDoctor";

interface Props {
    id: string;
}

export function DeleteDoctorButton({
    id,
}: Props) {
    const router = useRouter();

    async function handleDelete() {
        const confirmed = window.confirm(
            "Удалить врача?"
        );

        if (!confirmed) {
            return;
        }

        const result = await deleteDoctor(id);

        if (!result.success) {
            console.error(
    result.errors ?? "Произошла ошибка"
);(result.errors);
            return;
        }

        router.refresh();
    }

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
        >
            Удалить
        </Button>
    );
}