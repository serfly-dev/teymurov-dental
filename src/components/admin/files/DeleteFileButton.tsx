"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { showError, showSuccess } from "@/lib/utils/toast";

interface DeleteFileButtonProps {
    id: string;
}

export function DeleteFileButton({
    id,
}: DeleteFileButtonProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);

        try {
            const response = await fetch(
                `/admin/media/api/file/${id}`,
                {
                    method: "DELETE",
                }
            );

            const result = await response.json();

            if (!result.success) {
                if (result.inUse) {
                    showError(
                        "Файл не может быть удален, так как он используется в докторах, сертификатах, статьях или услугах"
                    );
                } else {
                    showError(result.error);
                }
                return;
            }

            showSuccess("Файл удален");
            setOpen(false);

            window.location.reload();
        } catch (error) {
            console.error("DELETE FILE ERROR:", error);
            showError("Ошибка удаления файла");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
            >
                Удалить
            </Button>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Удалить файл?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Это действие нельзя отменить.
                            Файл будет удален навсегда.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Отмена
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? "Удаление..." : "Удалить"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
