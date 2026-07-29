import { randomUUID } from "crypto";
import { cookies } from "next/headers";

import { prisma } from "@/server/db/prisma";

const SESSION_COOKIE = "session";

export async function createSession(userId: string): Promise<void> {
  const token = randomUUID();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.userSession.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}
export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.userSession.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await prisma.userSession.delete({
      where: {
        token,
      },
    });

    cookieStore.delete(SESSION_COOKIE);

    return null;
  }

  return session;
}