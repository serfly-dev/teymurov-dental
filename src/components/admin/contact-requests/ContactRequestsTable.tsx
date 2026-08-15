import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    CALLBACK_TIME_LABELS,
    CONTACT_REQUEST_STATUS_LABELS,
} from "./constants";
import type { Prisma } from "@/generated/prisma/client";
import { ContactRequestStatus } from "./ContactRequestStatus";
import { DeleteContactRequestButton } from "./DeleteContactRequestButton";
import { ContactRequestStatusBadge } from "./ContactRequestStatusBadge";
import { ContactRequestsSearch } from "./ContactRequestsSearch";
import { ContactRequestsSort } from "./ContactRequestsSort";
import { formatPhone } from "@/lib/utils/formatPhone";
type ContactRequest = Prisma.ContactRequestGetPayload<{
    include: {
        service: true;
    };
}>;

interface ContactRequestsTableProps {
    contactRequests: ContactRequest[];
}

export function ContactRequestsTable({
    contactRequests,
}: ContactRequestsTableProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">                <CardTitle>
                Обращения
            </CardTitle>
                <div className="flex items-center gap-3">
                    <ContactRequestsSearch />
                    <ContactRequestsSort />
                </div>            </CardHeader>
            <CardContent>
                <table className="w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-3">
                                Тип
                            </th>
                            <th>
                                Имя
                            </th>
                            <th>
                                Телефон
                            </th>
                            <th>
                                Время звонка
                            </th>
                            <th>
                                Комментарий
                            </th>
                            <th>
                                Услуга
                            </th>
                            <th>
                                Статус
                            </th>
                            <th>
                                Дата
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactRequests.map((request) => (
                            <tr
                                key={request.id}
                                className="border-b"
                            >
                                <td className="py-3">
                                    <div className="flex flex-col gap-2">
                                        <ContactRequestStatusBadge
                                            status={request.status}
                                        />

                                        {request.type === "APPOINTMENT"
                                            ? "Запись"
                                            : "Вопрос"}
                                    </div>

                                </td>
                                <td>
                                    {request.name}
                                </td>
                                <td>
                                    {formatPhone(request.phone)}
                                </td>
                                <td>
                                    {CALLBACK_TIME_LABELS[request.callbackTime]}
                                </td>
                                <td className="max-w-48 py-3 whitespace-pre-wrap break-words">
                                    {request.comment || "—"}
                                </td>                                <td>
                                    {request.service?.name ?? "—"}
                                </td>
                                <td>
                                    <ContactRequestStatus
                                        id={request.id}
                                        status={request.status}
                                    />

                                </td>
                                <td>
                                    {new Intl.DateTimeFormat(
                                        "ru-RU"
                                    ).format(
                                        request.createdAt
                                    )}
                                </td>
                                <td className="py-3">
                                    <DeleteContactRequestButton
                                        id={request.id}
                                    />
                                </td>
                            </tr>
                        ))}
                        {contactRequests.length === 0 && (
                            <tr>
                                <td
                                    colSpan={9}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    Обращений пока нет.
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>

            </CardContent>

        </Card>
    );
}