import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/main/Header/Header"
export const metadata: Metadata = {
    title: "Теймуров Dental",
    description: "Стоматологическая клиника",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ru"
            className="h-full antialiased"
        >
            <body className="min-h-full flex flex-col">
                <Header/>
                {children}
                <Toaster />
            </body>
        </html>
    );
}