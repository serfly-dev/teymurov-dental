import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}