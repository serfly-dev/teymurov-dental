"use client";

import Image from "next/image";

import { showError, showSuccess } from "@/lib/utils/toast";
import { DeleteFileButton } from "./DeleteFileButton";
import { FileAltForm } from "./FileAltForm";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { File as FileIcon, FileText, FileJson, FileCode } from "lucide-react";

import type { FileWithDisplayName, FileUsageInfo } from "./types";

interface FileCardProps {
    file: FileWithDisplayName;
    usage?: FileUsageInfo;
    onAltChange?: (fileId: string, newAlt: string | null) => void;
}

export function FileCard({ file, usage, onAltChange }: FileCardProps) {
    const usageCount = getFileUsageCount(usage);

    const handleAltUpdate = (newAlt: string | null) => {
        onAltChange?.(file.id, newAlt);
        showSuccess("Alt обновлен");
    };

    const formattedDate = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(file.createdAt);

    const formattedSize = formatFileSize(file.size);

    // Тип файла для отображения иконки
    const isImage = file.mimeType.startsWith("image/");
    const isPdf = file.mimeType === "application/pdf";

    return (
        <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md">
            {/* Превью */}
            <div className="relative aspect-video w-full bg-muted">
                {isImage ? (
                    <div className="relative h-full w-full overflow-hidden rounded-md bg-muted">
                        <Image
                            src={file.url}
                            alt={file.originalName || file.filename}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Overlay при наведении */}
                        <div className="absolute inset-0 bg-black/0 transition-all duration-300 hover:bg-black/10" />
                    </div>
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                        {isPdf ? (
                            <div className="text-center">
                                <FileText className="mx-auto mb-2 h-12 w-12 text-red-600" />
                                <span className="text-sm font-medium text-red-600">PDF</span>
                            </div>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                {file.extension.match(/\.(doc|docx)$/i) ? (
                                    <FileText className="h-16 w-16 text-blue-600 opacity-70" />
                                ) : file.extension.match(/\.(xls|xlsx)$/i) ? (
                                    <FileCode className="h-16 w-16 text-green-600 opacity-70" />
                                ) : file.extension.match(/\.(json)$/i) ? (
                                    <FileJson className="h-16 w-16 text-yellow-600 opacity-70" />
                                ) : (
                                    <FileIcon className="h-16 w-16 text-muted-foreground opacity-70" />
                                )}
                            </div>
                        )}
                    </div>
                )}
                {/* Badge типа файла */}
                <div className="absolute top-2 left-2">
                    <Badge
                        variant="secondary"
                        className="bg-background/90 backdrop-blur-sm shadow-sm"
                    >
                        {isPdf ? "PDF" : file.extension.replace(".", "").toUpperCase()}
                    </Badge>
                </div>
            </div>

            {/* Контент */}
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {/* Название файла - отображаем displayName */}
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                            <p className="font-medium truncate text-sm" title={file.filename}>
                                {file.displayName}
                            </p>
                        </div>
                        <span className="flex-shrink-0 text-xs text-muted-foreground">
                            {formattedSize}
                        </span>
                    </div>

                    {/* Оригинальное имя (техническое) */}
                    {file.originalName !== file.filename && (
                        <p className="text-xs text-muted-foreground truncate" title={file.originalName}>
                            {file.originalName}
                        </p>
                    )}
                </div>

                <Separator className="my-2" />

                {/* Дата загрузки */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Загружен: {formattedDate}</span>
                </div>

                {/* Использование */}
                <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                        Использование
                    </p>
                    {usageCount === 0 ? (
                        <span className="text-xs text-muted-foreground italic">
                            Не используется
                        </span>
                    ) : (
                        <div className="flex flex-wrap gap-1">
                            {usage?.doctors?.count && usage.doctors.count > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                    Врачи ({usage.doctors.count})
                                </Badge>
                            )}
                            {usage?.certificates?.count && usage.certificates.count > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                    Сертификаты ({usage.certificates.count})
                                </Badge>
                            )}
                            {usage?.articles?.count && usage.articles.count > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                    Статьи ({usage.articles.count})
                                </Badge>
                            )}
                            {usage?.serviceImages?.count && usage.serviceImages.count > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                    Услуги ({usage.serviceImages.count})
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Alt текст */}
                <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                        Alt-текст
                    </p>
                    <FileAltForm
                        id={file.id}
                        currentAlt={file.alt}
                        onAltChange={handleAltUpdate}
                    />
                </div>
            </CardContent>

            {/* Footer с действиями */}
            <CardFooter className="flex justify-between gap-2 bg-muted/30 pt-3">
                <span className="text-xs text-muted-foreground">
                    ID: {file.id.slice(0, 8)}...
                </span>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            window.open(file.url, "_blank");
                        }}
                    >
                        Открыть
                    </Button>
                    <DeleteFileButton id={file.id} />
                </div>
            </CardFooter>
        </Card>
    );
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} Б`;
    }
    if (bytes < 1024 * 1024) {
        return `${Math.round(bytes / 1024)} КБ`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

function getFileUsageCount(usage?: FileUsageInfo): number {
    if (!usage) return 0;
    return (
        (usage.doctors?.count || 0) +
        (usage.certificates?.count || 0) +
        (usage.articles?.count || 0) +
        (usage.serviceImages?.count || 0)
    );
}
