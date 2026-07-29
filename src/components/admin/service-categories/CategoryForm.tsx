"use client";

import { useRouter } from "next/navigation";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  categorySchema,
  type CategorySchema,
} from "@/lib/validations/category";

import { createCategory } from "@/app/admin/(protected)/service-categories/actions/createCategory";
import { updateCategory } from "@/app/admin/(protected)/service-categories/actions/updateCategory";

import type { ServiceCategory } from "@/generated/prisma/client";

interface Props {
  category?: ServiceCategory;
}

export function CategoryForm({
  category,
}: Props) {
  const router = useRouter();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
      sortOrder: category?.sortOrder ?? 0,
      isPublished: category?.isPublished ?? true,
    },
  });

  const onSubmit: SubmitHandler<CategorySchema> = async (
    values,
  ) => {
    const result = category
      ? await updateCategory(
          category.id,
          values,
        )
      : await createCategory(values);

    if (!result.success) {
      if (result.errors?.slug) {
        form.setError("slug", {
          message: result.errors.slug[0],
        });
      }

      if (result.errors?.name) {
        form.setError("name", {
          message: result.errors.name[0],
        });
      }

      if (result.errors?.description) {
        form.setError("description", {
          message: result.errors.description[0],
        });
      }

      if (result.errors?.sortOrder) {
        form.setError("sortOrder", {
          message: result.errors.sortOrder[0],
        });
      }

      return;
    }

    router.push(
      "/admin/service-categories",
    );

    router.refresh();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl space-y-5"
    >
      <div>
        <Input
          placeholder="Название"
          {...form.register("name")}
        />

        {form.formState.errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Slug"
          {...form.register("slug")}
        />

        {form.formState.errors.slug && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.slug.message}
          </p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Описание"
          {...form.register("description")}
        />

        {form.formState.errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {
              form.formState.errors.description
                .message
            }
          </p>
        )}
      </div>

      <div>
        <Input
          type="number"
          {...form.register("sortOrder", {
            valueAsNumber: true,
          })}
        />

        {form.formState.errors.sortOrder && (
          <p className="mt-1 text-sm text-red-500">
            {
              form.formState.errors.sortOrder
                .message
            }
          </p>
        )}
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          {...form.register("isPublished")}
        />

        Опубликовано
      </label>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? "Сохранение..."
          : category
            ? "Сохранить изменения"
            : "Создать категорию"}
      </Button>
    </form>
  );
}