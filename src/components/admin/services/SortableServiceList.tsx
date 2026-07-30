"use client";
import {
    DndContext,
    closestCenter,
    type DragEndEvent,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { useId } from "react";
import { CSS } from "@dnd-kit/utilities";
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
    items: ServiceListItem[];

    onReorder: (
        items: ServiceListItem[]
    ) => void;

    onEdit: (
        item: ServiceListItem
    ) => void;

    onDelete: (
        id: string
    ) => void;
}
function SortableItem({
    item,
    onEdit,
    onDelete,
}: {
    item: ServiceListItem;
    onEdit: (item: ServiceListItem) => void;
    onDelete: (id: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: item.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="rounded-lg border p-4"
            {...attributes}
        >
            {item.title && (
                <h3 className="font-medium">
                    {item.title}
                </h3>
            )}

            <div
                {...listeners}
                className="mb-3 cursor-grab text-xs text-muted-foreground"
            >
                Перетащить
            </div>

            <p className="mt-2 text-sm">
                {item.text}
            </p>

            <div className="flex gap-2 mt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => onEdit(item)}
                >
                    Редактировать
                </Button>

                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => onDelete(item.id)}
                >
                    Удалить
                </Button>
            </div>
        </div>
    );
}
export function SortableServiceList({
    items,
    onReorder,
    onEdit,
    onDelete,
}: Props) {
    const id = useId();
    function handleDragEnd(event: DragEndEvent) {
        const {
            active,
            over,
        } = event;

        if (!over) {
            return;
        }

        if (
            active.id === over.id
        ) {
            return;
        }

        const oldIndex =
            items.findIndex(
                (item) =>
                    item.id === active.id
            );

        const newIndex =
            items.findIndex(
                (item) =>
                    item.id === over.id
            );

        const newItems = arrayMove(
            items,
            oldIndex,
            newIndex
        ).map((item, index) => ({
            ...item,
            sortOrder: index,
        }));

        onReorder(newItems);
    }

    return (
        <DndContext
            id={id}
            collisionDetection={
                closestCenter
            }
            onDragEnd={handleDragEnd}
        >            <SortableContext
            items={items.map(
                (item) => item.id
            )}
            strategy={
                verticalListSortingStrategy
            }
        >
                <div className="space-y-3">
                    {items.map((item) => (
                        <SortableItem
                            key={item.id}
                            item={item}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
