"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export function CategoriesFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function handleSearch(value: string) {
    const url = new URLSearchParams(params);

    if (value) {
      url.set("search", value);
    } else {
      url.delete("search");
    }

    router.push(
      `/admin/service-categories?${url.toString()}`
    );
  }

  return (
    <Input
      placeholder="Поиск категорий..."
      defaultValue={params.get("search") ?? ""}
      onChange={(e) =>
        handleSearch(e.target.value)
      }
      className="max-w-sm"
    />
  );
}