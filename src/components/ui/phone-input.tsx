"use client";

import { IMaskInput } from "react-imask";

import { cn } from "@/lib/utils";

interface PhoneInputProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function PhoneInput({
    value,
    onChange,
    placeholder = "+7 (___) ___-__-__",
    className,
}: PhoneInputProps) {
    return (
        <IMaskInput
            mask="+{7} (000) 000-00-00"
            value={value}
            placeholder={placeholder}
            onAccept={(value) =>
                onChange(String(value))
            }
            className={cn(
                "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                className
            )}
        />
    );
}