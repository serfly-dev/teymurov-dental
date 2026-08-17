"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { uploadFile } from "@/app/admin/(protected)/media/actions/uploadFile";

import { showError, showSuccess } from "@/lib/utils/toast";

interface Props {
    value?: string;
    onUpload: (url: string) => void;
    accept?: string;
    maxSize?: number;
}

export function FileUpload({
    value,
    onUpload,
    accept = "image/jpeg,image/png,image/webp,image/gif,application/pdf",
    maxSize = 10 * 1024 * 1024,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > maxSize) {
            showError(
                `Размер файла не должен превышать ${maxSize / 1024 / 1024} МБ`
            );
            return;
        }

        setLoading(true);

        const result = await uploadFile(file);

        setLoading(false);

        if (!result.success || !result.file?.url) {
            showError(result.error);
            return;
        }

        onUpload(result.file.url);

        showSuccess("Файл загружен");
    }

    return (
        <div className="space-y-3">
            {value && (
                <div className="overflow-hidden rounded-md">
                    {value.startsWith("/uploads") &&
                    (value.endsWith(".jpg") ||
                        value.endsWith(".jpeg") ||
                        value.endsWith(".png") ||
                        value.endsWith(".webp") ||
                        value.endsWith(".gif")) ? (
                        <div className="relative h-40 w-full max-w-md">
                            <Image
                                src={value}
                                alt="Предпросмотр"
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-40 w-full max-w-md items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50">
                            <span className="text-sm text-muted-foreground">
                                PDF файл
                            </span>
                        </div>
                    )}
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                hidden
                accept={accept}
                onChange={handleUpload}
            />

            <Button
                type="button"
                disabled={loading}
                onClick={() =>
                    inputRef.current?.click()
                }
            >
                {loading
                    ? "Загрузка..."
                    : "Выбрать файл"}
            </Button>
        </div>
    );
}
