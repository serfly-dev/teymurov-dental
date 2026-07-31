"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { uploadCertificate } from "@/app/admin/(protected)/doctors/actions/uploadCertificate";

interface Props {
    onUpload: (url: string) => void;
}

export function CertificateUpload({
    onUpload,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] =
        useState(false);
    const [error, setError] = useState<string | null>(null);
    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file =
            event.target.files?.[0];

        if (!file) return;
        setError(null);
        setLoading(true);

        const result =
            await uploadCertificate(file);

        setLoading(false);

        if (!result.success || !result.url) {
            setError(
                result.error ?? "Ошибка загрузки файла"
            );

            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError(
                "Размер файла не должен превышать 5 МБ"
            );

            return;
        }
        console.log("NEW IMAGE URL", result.url);
        onUpload(result.url);
    }

    return (
        <div className="space-y-3">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleUpload}
            />
            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}
            <Button
                type="button"
                disabled={loading}
                onClick={() =>
                    inputRef.current?.click()
                }
            >
                {loading
                    ? "Загрузка..."
                    : "Выбрать сертификат"}
            </Button>
        </div>
    );
}