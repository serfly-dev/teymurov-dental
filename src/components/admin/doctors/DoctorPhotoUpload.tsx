"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { uploadDoctorPhoto } from "@/app/admin/(protected)/doctors/actions/uploadDoctorPhoto";
import {
    showError,
    showSuccess,
} from "@/lib/utils/toast";

interface Props {
    value?: string;
    onUpload: (url: string) => void;
}

export function DoctorPhotoUpload({
    value,
    onUpload,
}: Props) {
    const inputRef =
        useRef<HTMLInputElement>(null);

    const [loading, setLoading] =
        useState(false);

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file =
            event.target.files?.[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showError(
                "Размер файла не должен превышать 5 МБ"
            );

            return;
        }

        setLoading(true);

        const result =
            await uploadDoctorPhoto(file);

        setLoading(false);

        if (!result.success || !result.url) {
            showError(
                result.error
            );

            return;
        }

        onUpload(result.url);

        showSuccess(
            "Фото врача загружено"
        );
    }
    return (
        <div className="space-y-3">
            {value && (
                <div className="overflow-hidden rounded-md">
                    <img
                        src={value}
                        alt="Фото врача"
                        className="h-40 w-40 object-cover"
                    />
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
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
                    : "Выбрать фото"}
            </Button>
        </div>
    );
}