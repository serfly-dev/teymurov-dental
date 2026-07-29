"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { deleteCategory } from "@/app/admin/(protected)/service-categories/actions/deleteCategory";

interface Props {
  id: string;
}

export function DeleteCategoryButton({
  id,
}: Props) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Вы действительно хотите удалить категорию?"
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result = await deleteCategory(id);

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
      {pending ? "Удаление..." : "Удалить"}
    </Button>
  );
}