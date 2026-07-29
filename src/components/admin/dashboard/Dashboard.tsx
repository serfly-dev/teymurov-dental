import {
  BriefcaseMedical,
  FolderTree,
  Newspaper,
  Users,
} from "lucide-react";

import { prisma } from "@/server/db/prisma";

import { StatCard } from "../cards/StatCard";

export async function Dashboard() {
  const [
    services,
    serviceCategories,
    doctors,
    articles,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.serviceCategory.count(),
    prisma.doctor.count(),
    prisma.article.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Панель управления
        </h1>

        <p className="mt-2 text-slate-500">
          Добро пожаловать в административную панель.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Услуги"
          value={services}
          icon={BriefcaseMedical}
        />

        <StatCard
          title="Категории"
          value={serviceCategories}
          icon={FolderTree}
        />

        <StatCard
          title="Врачи"
          value={doctors}
          icon={Users}
        />

        <StatCard
          title="Статьи"
          value={articles}
          icon={Newspaper}
        />
      </div>
    </div>
  );
}