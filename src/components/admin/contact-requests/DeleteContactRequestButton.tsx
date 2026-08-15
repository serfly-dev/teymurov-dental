"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { deleteContactRequest } from "@/app/admin/(protected)/contact-requests/actions/deleteContactRequest";

interface DeleteContactRequestButtonProps {
    id: string;
}

export function DeleteContactRequestButton({
    id,
}: DeleteContactRequestButtonProps) {
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    function onDelete() {
        startTransition(async () => {
            const result =
                await deleteContactRequest(id);

            if (result.success) {
                router.refresh();
            }
        });
    }

    return (
        <AlertDialog>

            <AlertDialogTrigger asChild>

                <Button
                    variant="destructive"
                    size="sm"
                >
                    Удалить
                </Button>

            </AlertDialogTrigger>

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>
                        Удалить обращение?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Это действие нельзя отменить.
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>
                        Отмена
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onDelete}
                        disabled={isPending}
                    >
                        Удалить
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>
    );
}