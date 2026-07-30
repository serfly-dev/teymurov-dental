"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    serviceListSchema,
    type ServiceListSchema,
} from "@/lib/validations/serviceList";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
    defaultValues?: Partial<ServiceListSchema>;

    showTitle?: boolean;

    onSubmit: (
        data: ServiceListSchema
    ) => Promise<void> | void;

    onCancel: () => void;
}

export function ServiceListForm({
    defaultValues,
    showTitle = false,
    onSubmit,
    onCancel,
}: Props) {
    const form = useForm<ServiceListSchema>({
        resolver: zodResolver(serviceListSchema),

        defaultValues: {
            serviceId:
                defaultValues?.serviceId ?? "",

            type:
                defaultValues?.type ??
                "BENEFIT",

            title:
                defaultValues?.title ?? "",

            text:
                defaultValues?.text ?? "",

            sortOrder:
                defaultValues?.sortOrder ?? 0,
        },
    });

    return (
        <div className="space-y-4 rounded-lg border p-4">            {showTitle && (
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Заголовок
                </label>

                <Input
                    {...form.register("title")}
                />
            </div>
        )}

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Текст
                </label>

                <Textarea
                    className="min-h-24"
                    {...form.register("text")}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Сортировка
                </label>

                <Input
                    type="number"
                    min={0}
                    {...form.register(
                        "sortOrder"
                    )}
                />
            </div>

            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={form.handleSubmit((data) => {
                        console.log("FORM DATA", data);
                        onSubmit(data);
                    })}                >
                    Сохранить
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                >
                    Отмена
                </Button>
            </div>
        </div>
    );
}