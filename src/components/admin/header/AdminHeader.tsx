import { logout } from "@/app/admin/actions/logout";

import { LogoutButton } from "./LogoutButton";

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">
          Панель управления
        </h1>

        <p className="text-sm text-slate-500">
          Управление содержимым сайта
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold">
            Администратор
          </p>

          <p className="text-xs text-slate-500">
            admin@teymurov.ru
          </p>
        </div>

        <form action={logout}>
          <LogoutButton />
        </form>
      </div>
    </header>)
}