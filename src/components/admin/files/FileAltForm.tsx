"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showError, showSuccess } from "@/lib/utils/toast";

interface FileAltFormProps {
    id: string;
    currentAlt: string | null;
    onAltChange: (newAlt: string | null) => void;
}

export function FileAltForm({
    id,
    currentAlt,
    onAltChange,
}: FileAltFormProps) {
    const [value, setValue] = useState(currentAlt ?? "");
    const [loading, setLoading] = useState(false);

    async function handleUpdate() {
        setLoading(true);

        try {
            const response = await fetch(
                `/admin/media/api/file/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ alt: value.trim() || null }),
                }
            );

            const result = await response.json();

            if (!result.success) {
                showError(result.error);
                return;
            }

            showSuccess("Alt обновлен");
            onAltChange(result.file.alt);
        } catch (error) {
            console.error("UPDATE FILE ALT ERROR:", error);
            showError("Ошибка обновления alt");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-2">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Альтернативный текст"
                className="w-64"
            />
            <Button
                type="button"
                size="sm"
                onClick={handleUpdate}
                disabled={loading}
            >
                {loading ? "Сохранение..." : "Сохранить"}
            </Button>
        </div>
    );
}
