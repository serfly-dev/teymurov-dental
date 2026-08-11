import {
  LayoutDashboard,
  BriefcaseMedical,
  FolderTree,
  Users,
  Newspaper,
  Files,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Панель",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Услуги",
    href: "/admin/services",
    icon: BriefcaseMedical,
  },
  {
    title: "Категории услуг",
    href: "/admin/service-categories",
    icon: FolderTree,
  },
  {
    title: "Врачи",
    href: "/admin/doctors",
    icon: Users,
  },
  {
    title: "Статьи",
    href: "/admin/articles",
    icon: Newspaper,
  },
  {
    title: "Категории статей",
    href: "/admin/article-categories",
    icon: FolderTree,
  },
  {
    title: "Файлы",
    href: "/admin/media",
    icon: Files,
  },
  {
    title: "Настройки",
    href: "/admin/settings",
    icon: Settings,
  },
];