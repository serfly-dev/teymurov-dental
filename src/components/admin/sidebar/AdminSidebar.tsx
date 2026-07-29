"use client";

import { navigation } from "./navigation";
import { SidebarLink } from "./components/SidebarLink";

export function AdminSidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900">
          Теймуров Dental
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Панель управления
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {navigation.map((item) => (
          <SidebarLink
            key={item.href}
            {...item}
          />
        ))}
      </nav>
    </aside>
  );
}