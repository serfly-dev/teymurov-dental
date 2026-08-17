"use client";

import { useRouter } from "next/navigation";

import { FileUpload } from "./FileUpload";

import { showError, showSuccess } from "@/lib/utils/toast";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";

interface Props {
    onUpload?: () => void;
}

export function UploadButton({ onUpload }: Props) {
    const router = useRouter();

    const handleFileUpload = (url: string) => {
        showSuccess("Файл успешно загружен");
        onUpload?.();
        router.refresh();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size="default" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Загрузить файл
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Загрузка файла</DialogTitle>
                    <DialogDescription>
                        Выберите файл для загрузки на сервер.
                        <br />
                        Поддерживаемые форматы: JPG, PNG, WEBP, GIF, PDF.
                        Максимальный размер: 10 МБ.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <FileUpload
                        onUpload={handleFileUpload}
                        accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                        maxSize={10 * 1024 * 1024}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
