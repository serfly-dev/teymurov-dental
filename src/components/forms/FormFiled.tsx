import { ReactNode } from "react";

import { Label } from "@/components/ui/label";

import { FieldError } from "./FieldError";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function FormField({
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {children}

      <FieldError error={error} />
    </div>
  );
}