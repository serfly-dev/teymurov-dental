import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "@/app/admin/(protected)/media/actions/deleteFile";
import { updateFileAlt } from "@/app/admin/(protected)/media/actions/updateFileAlt";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const result = await deleteFile(id);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error,
                    inUse: result.inUse
                },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE FILE API ERROR:", error);

        return NextResponse.json(
            { error: "Ошибка удаления файла" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const body = await request.json();
        const { alt } = body;

        const result = await updateFileAlt(id, alt);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, file: result.file });
    } catch (error) {
        console.error("PATCH FILE API ERROR:", error);

        return NextResponse.json(
            { error: "Ошибка обновления alt" },
            { status: 500 }
        );
    }
}
