"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/server/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function loginAction(
  formData: FormData,
): Promise<void> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.isActive) {
    throw new Error("Неверный email или пароль");
  }

  const validPassword = await verifyPassword(
    password,
    user.passwordHash,
  );

  if (!validPassword) {
    throw new Error("Неверный email или пароль");
  }

  await createSession(user.id);

  redirect("/admin");
}