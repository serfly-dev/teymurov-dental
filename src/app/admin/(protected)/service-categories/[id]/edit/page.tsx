import { notFound } from "next/navigation";

import { prisma } from "@/server/db/prisma";
import { CategoryForm } from "@/components/admin/service-categories/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await prisma.serviceCategory.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    notFound();
  }

  return <CategoryForm category={category} />;
}