"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ContactRequestModal } from "./ContactRequestModal";

interface ContactRequestButtonProps {
    type: "APPOINTMENT" | "QUESTION";
}

export function ContactRequestButton({
    type,
}: ContactRequestButtonProps) {

    const [open, setOpen] =
        useState(false);

    const isAppointment =
        type === "APPOINTMENT";

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
            >
                {isAppointment
                    ? "Записаться на прием"
                    : "Остались вопросы?"}
            </Button>

            <ContactRequestModal
                open={open}
                onOpenChange={setOpen}
                type={type}
            />
        </>
    );
}