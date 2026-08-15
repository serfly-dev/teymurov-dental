"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ContactRequestForm } from "./ContactRequestForm";
interface ContactRequestModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    type: "APPOINTMENT" | "QUESTION";

    serviceId?: string;
    serviceName?: string;
}

export function ContactRequestModal({
    open,
    onOpenChange,
    type,
}: ContactRequestModalProps) {
    const isAppointment =
        type === "APPOINTMENT";

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle>
                        {isAppointment
                            ? "Записаться на прием"
                            : "Остались вопросы?"}
                    </DialogTitle>

                    <DialogDescription>
                        {isAppointment
                            ? "Оставьте заявку, и мы перезвоним вам в удобное время."
                            : "Оставьте свои контакты, и мы ответим на все ваши вопросы."}
                    </DialogDescription>

                </DialogHeader>

                <ContactRequestForm
                    type={type}
                    onSuccess={() => onOpenChange(false)}
                />

            </DialogContent>
        </Dialog>
    );
}