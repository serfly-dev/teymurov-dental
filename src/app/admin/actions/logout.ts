"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/server/db/prisma";

import { SESSION_COOKIE } from "@/lib/auth/constants";
export async function logout() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.userSession.deleteMany({
      where: {
        token,
      },
    });

    cookieStore.delete(SESSION_COOKIE);
  }

  redirect("/admin/login");
}