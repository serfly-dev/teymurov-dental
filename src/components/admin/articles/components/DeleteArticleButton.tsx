"use client";

import { useRouter } from "next/navigation";

import { deleteArticle } from "@/app/admin/(protected)/articles/actions/deleteArticle";

import {
    showError,
    showSuccess,
} from "@/lib/utils/toast";

import { Button } from "@/components/ui/button";

interface Props {
    id: string;
}

export function DeleteArticleButton({
    id,
}: Props) {
    const router = useRouter();

    async function handleDelete() {
        const confirmed = window.confirm(
            "Удалить статью?"
        );

        if (!confirmed) {
            return;
        }

        const result =
            await deleteArticle(id);

        if (!result.success) {
            const error =
                result.errors &&
                "form" in result.errors
                    ? result.errors.form?.[0]
                    : null;

            showError(
                error ??
                    "Не удалось удалить статью"
            );

            return;
        }

        showSuccess(
            "Статья удалена"
        );

        router.refresh();
    }

    return (
        <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
        >
            Удалить
        </Button>
    );
}