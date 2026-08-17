"use client";

import { CertificateFileUpload } from "../files/CertificateFileUpload";

interface Props {
    value?: string;
    onUpload: (url: string) => void;
}

export function CertificateUpload({
    value,
    onUpload,
}: Props) {
    return (
        <CertificateFileUpload
            value={value}
            onUpload={onUpload}
        />
    );
}
