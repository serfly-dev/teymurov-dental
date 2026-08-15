import { Badge } from "@/components/ui/badge";

interface ContactRequestStatusBadgeProps {
    status: "NEW" | "CALLED" | "COMPLETED" | "CANCELED";
}

export function ContactRequestStatusBadge({
    status,
}: ContactRequestStatusBadgeProps) {
    switch (status) {
        case "NEW":
            return (
                <Badge className="bg-blue-500 hover:bg-blue-500">
                    Новая
                </Badge>
            );

        case "CALLED":
            return (
                <Badge className="bg-yellow-500 hover:bg-yellow-500">
                    Перезвонили
                </Badge>
            );

        case "COMPLETED":
            return (
                <Badge className="bg-green-600 hover:bg-green-600">
                    Завершена
                </Badge>
            );

        case "CANCELED":
            return (
                <Badge className="bg-red-600 hover:bg-red-600">
                    Отменена
                </Badge>
            );
    }
}