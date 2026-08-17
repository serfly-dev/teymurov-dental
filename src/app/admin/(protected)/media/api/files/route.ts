import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const search =
            searchParams.get("search")?.trim() ?? "";
        const sort =
            searchParams.get("sort") ?? "createdAt";
        const order =
            searchParams.get("order") ?? "desc";

        const files = await prisma.file.findMany({
            where: search
                ? {
                      OR: [
                          {
                              filename: {
                                  contains: search,
                                  mode: "insensitive",
                              },
                          },
                          {
                              originalName: {
                                  contains: search,
                                  mode: "insensitive",
                              },
                          },
                      ],
                  }
                : undefined,
            orderBy: {
                [sort]: order,
            },
        });

        return NextResponse.json({ files });
    } catch (error) {
        console.error("GET FILES API ERROR:", error);

        return NextResponse.json(
            { error: "Ошибка получения файлов" },
            { status: 500 }
        );
    }
}
