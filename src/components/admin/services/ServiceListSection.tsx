"use client";

import { ReactNode } from "react";
import { SortableServiceList } from "./SortableServiceList";
import { Button } from "@/components/ui/button";

interface ServiceListItem {
    id: string;

    type:
    | "BENEFIT"
    | "INDICATION"
    | "CONTRAINDICATION"
    | "RECOMMENDATION"
    | "STAGE";

    title: string | null;

    text: string;

    sortOrder: number;
}
interface Props {
    title: string;
    description: string;

    items: ServiceListItem[];

    onAdd: () => void;

    onEdit: (
        item: ServiceListItem
    ) => void;

    onDelete: (
        id: string
    ) => void;

    onReorder: (
        items: ServiceListItem[]
    ) => void;

    children?: ReactNode;
}

export function ServiceListSection({
    title,
    description,
    items,
    onAdd,
    onEdit,
    onDelete,
    onReorder,
    children,
}: Props) {
    return (
        <section className="space-y-4 border-t pt-6">
            <div>
                <h2 className="text-base font-medium">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                </p>
            </div>

            <Button
                type="button"
                variant="outline"
                onClick={onAdd}
            >
                Добавить пункт
            </Button>

            {children}
            {items.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                    Пока нет ни одного элемента.
                </div>
            ) : (
                <SortableServiceList
                    items={[...items].sort(
                        (a, b) =>
                            a.sortOrder - b.sortOrder
                    )}
                    onReorder={onReorder}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />)}
        </section>
    );
}