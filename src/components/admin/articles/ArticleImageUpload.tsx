"use client";

import { ArticleFileUpload } from "../files/ArticleFileUpload";

interface Props {
    value?: string;
    onUpload: (url: string) => void;
}

export function ArticleImageUpload({
    value,
    onUpload,
}: Props) {
    return (
        <ArticleFileUpload
            value={value}
            onUpload={onUpload}
        />
    );
}
