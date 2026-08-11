"use client";

import { useRouter } from "next/navigation";

import { deleteCategory } from "@/app/admin/(protected)/article-categories/actions/deleteCategory";

import {
    showError,
    showSuccess,
} from "@/lib/utils/toast";

import { Button } from "@/components/ui/button";

interface Props {
    id: string;
}

export function DeleteCategoryButton({
    id,
}: Props) {
    const router = useRouter();

    async function handleDelete() {
        const confirmed = window.confirm(
            "Удалить категорию?"
        );

        if (!confirmed) {
            return;
        }

        const result =
            await deleteCategory(id);

        if (!result.success) {
            const error =
                result.errors &&
                "form" in result.errors
                    ? result.errors.form?.[0]
                    : null;

            showError(
                error ??
                    "Не удалось удалить категорию"
            );

            return;
        }

        showSuccess(
            "Категория удалена"
        );

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