"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { FileCard } from "./FileCard";
import { UploadButton } from "./UploadButton";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { File as FileIcon, Filter, Search } from "lucide-react";

import type { FileWithDisplayName, FileUsageInfo } from "./types";

interface FilesTableProps {
    files: FileWithDisplayName[];
    search: string;
    sort: string;
    order: string;
    usage: Record<string, FileUsageInfo>;
}

export function FilesTable({
    files,
    search,
    sort,
    order,
    usage,
}: FilesTableProps) {
    const router = useRouter();
    const [localSearch, setLocalSearch] = useState(search);

    // Sync local search with URL params
    useEffect(() => {
        setLocalSearch(search);
    }, [search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalSearch(value);

        // Debounce search update
        const params = new URLSearchParams(window.location.search);
        if (value.trim()) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        router.push(`?${params.toString()}`);
    };

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        const [sortField, sortOrder] = value.split(":");
        params.set("sort", sortField);
        params.set("order", sortOrder);
        router.push(`?${params.toString()}`);
    };

    // Get current sort value for display
    const currentSortValue = `${sort}:${order}`;

    // Filter and sort files (client-side for now)
    const sortedFiles = [...files].sort((a, b) => {
        let comparison = 0;
        switch (sort) {
            case "createdAt":
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                break;
            case "filename":
                comparison = a.filename.localeCompare(b.filename);
                break;
            case "size":
                comparison = a.size - b.size;
                break;
            default:
                comparison = 0;
        }
        return order === "asc" ? comparison : -comparison;
    });

    // Пустое состояние
    if (files.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-muted bg-muted/20 px-4 py-12 text-center">
                <div className="rounded-full bg-muted p-4">
                    <FileIcon className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">Файлы отсутствуют</h3>
                <p className="mt-2 max-w-md text-muted-foreground">
                    У вас пока нет загруженных файлов. Загрузите изображения или документы для использования на сайте.
                </p>
                <div className="mt-8">
                    <UploadButton />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Верхняя панель (Toolbar) */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Файлы</h2>
                    <p className="text-sm text-muted-foreground">
                        Управление изображениями и документами сайта
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Поиск */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Поиск по имени..."
                            value={localSearch}
                            onChange={handleSearchChange}
                            className="pl-9 w-full sm:w-64"
                        />
                    </div>

                    {/* Сортировка */}
                    <Select value={currentSortValue} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Сортировка" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="createdAt:desc">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3 w-3" />
                                    По дате (новые)
                                </div>
                            </SelectItem>
                            <SelectItem value="createdAt:asc">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3 w-3" />
                                    По дате (старые)
                                </div>
                            </SelectItem>
                            <SelectItem value="filename:asc">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3 w-3" />
                                    По имени (A-Z)
                                </div>
                            </SelectItem>
                            <SelectItem value="filename:desc">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3 w-3" />
                                    По имени (Z-A)
                                </div>
                            </SelectItem>
                            <SelectItem value="size:desc">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3 w-3" />
                                    По размеру (большие)
                                </div>
                            </SelectItem>
                            <SelectItem value="size:asc">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3 w-3" />
                                    По размеру (маленькие)
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Кнопка загрузки - самая заметная */}
                    <UploadButton />
                </div>
            </div>

            {/* Grid с карточками файлов */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedFiles.map((file) => (
                    <FileCard
                        key={file.id}
                        file={file}
                        usage={usage[file.url]}
                    />
                ))}
            </div>

            {/* Footer с информацией */}
            <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
                <span>Всего файлов: {files.length}</span>
                <span>
                    Показано: {sortedFiles.length} из {files.length}
                </span>
            </div>
        </div>
    );
}
