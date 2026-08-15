"use client";

import {
    useForm,
} from "react-hook-form";
import { useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import {
    zodResolver,
} from "@hookform/resolvers/zod";
import { createContactRequest } from "@/app/actions/createContactRequest";
import {
    contactRequestSchema,
    type ContactRequestSchema,
} from "@/lib/validations/contact-request";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/FormFiled";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CALLBACK_TIME_OPTIONS } from "./constants";
interface ContactRequestFormProps {
    type: "APPOINTMENT" | "QUESTION";

    onSuccess?: () => void;
}

export function ContactRequestForm({
    type,
    onSuccess,
}: ContactRequestFormProps) {
    const [serverError, setServerError] =
        useState<string | null>(null);
    const form =
        useForm<ContactRequestSchema>({
            resolver:
                zodResolver(
                    contactRequestSchema
                ),

            defaultValues: {
                type,
                name: "",
                phone: "",
                callbackTime: "ANYTIME",
                serviceId: "",
                comment: "",
                website: "",
            },
        });

    async function onSubmit(
        data: ContactRequestSchema
    ) {
        setServerError(null);

        const result =
            await createContactRequest(data);

        if (!result.success) {

            const error =
                result.errors &&
                    "form" in result.errors
                    ? result.errors.form
                    : null;

            setServerError(error ?? null);

            return;
        }

        form.reset({
            type,
            name: "",
            phone: "",
            callbackTime: "ANYTIME",
            serviceId: "",
            comment: "",
            website: "",
        });

        onSuccess?.();
    }
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >

            <FormField
                label="Имя"
                error={form.formState.errors.name?.message}
            >
                <Input
                    {...form.register("name")}
                    placeholder="Введите ваше имя"
                />
            </FormField>
            <FormField
                label="Телефон"
                error={form.formState.errors.phone?.message}
            >
                <PhoneInput
                    value={form.watch("phone")}
                    onChange={(value) =>
                        form.setValue("phone", value, {
                            shouldValidate: true,
                        })
                    }
                />            </FormField>
            <FormField
                label="Удобное время для звонка"
                error={form.formState.errors.callbackTime?.message}
            >
                <Select
                    value={form.watch("callbackTime")}
                    onValueChange={(value: ContactRequestSchema["callbackTime"]) =>
                        form.setValue("callbackTime", value as ContactRequestSchema["callbackTime"], {
                            shouldValidate: true,
                        })
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>

                    <SelectContent>
                        {CALLBACK_TIME_OPTIONS.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>
            <FormField
                label="Комментарий"
                error={form.formState.errors.comment?.message}
            >
                <Textarea
                    {...form.register("comment")}
                    placeholder="При необходимости оставьте комментарий"
                    className="min-h-28"
                />
            </FormField>
            {serverError && (
                <p className="text-sm text-destructive">
                    {serverError}
                </p>
            )}
            <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                {...form.register("website")}
            />
            <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
            >
                {form.formState.isSubmitting
                    ? "Отправка..."
                    : type === "APPOINTMENT"
                        ? "Записаться на прием"
                        : "Отправить вопрос"}
            </Button>
        </form>
    );
}