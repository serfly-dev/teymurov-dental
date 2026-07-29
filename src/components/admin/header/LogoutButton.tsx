"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button
      type="submit"
      className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-100"
    >
      <LogOut size={18} />
      Выйти
    </button>
  );
}