"use client";

import { FileUpload } from "@/components/admin/files/FileUpload";

interface Props {
    value?: string;
    onUpload: (url: string) => void;
}

export function CertificateFileUpload({ value, onUpload }: Props) {
    return (
        <FileUpload
            value={value}
            onUpload={onUpload}
            accept="image/jpeg,image/png,image/webp"
            maxSize={5 * 1024 * 1024}
        />
    );
}
