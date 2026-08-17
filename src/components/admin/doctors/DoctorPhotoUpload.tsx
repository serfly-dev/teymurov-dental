"use client";

import { DoctorFileUpload } from "../files/DoctorFileUpload";

interface Props {
    value?: string;
    onUpload: (url: string) => void;
}

export function DoctorPhotoUpload({
    value,
    onUpload,
}: Props) {
    return (
        <DoctorFileUpload
            value={value}
            onUpload={onUpload}
        />
    );
}
