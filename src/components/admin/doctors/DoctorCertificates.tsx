"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCertificate } from "@/app/admin/(protected)/doctors/actions/updateCertificate";
import { CertificateUpload } from "./CertificateUpload";
import { createCertificate } from "@/app/admin/(protected)/doctors/actions/createCertificate";
import { deleteCertificate } from "@/app/admin/(protected)/doctors/actions/deleteCertificate";
import { updateDoctorCertificate } from "@/app/admin/(protected)/media/actions/updateDoctorCertificate";
import {
    showError,
    showSuccess,
} from "@/lib/utils/toast";
interface Certificate {
    id: string;
    name: string;
    image: string;
    year: number | null;
}

interface Props {
    doctorId: string;
    certificates: Certificate[];
}

export function DoctorCertificates({
    doctorId,
    certificates,
}: Props) {
    const [items, setItems] =
        useState(certificates);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] =
        useState("");

    const [year, setYear] =
        useState("");

    const [image, setImage] =
        useState("");

    async function handleCreate() {
        if (!name || !image) return;

        const result =
            await createCertificate({
                doctorId,
                name,
                image,
                year: year
                    ? Number(year)
                    : undefined,
            });

        if (!result.success || !result.data) {
            showError(
                result.error
            );
            return;
        }

        setItems((prev) => [
            ...prev,
            result.data,
        ]);
        setName("");
        setYear("");
        setImage("");
        showSuccess("Сертификат добавлен");
    }
    async function handleDelete(
        id: string
    ) {
        const result =
            await deleteCertificate(id);

        if (!result.success) {
            showError(
                result.error
            );
            return;
        }

        setItems((prev) =>
            prev.filter(
                (item) => item.id !== id
            )
        );
        showSuccess("Сертификат удалён");
    }
    async function handleUpdate(
        id: string
    ) {
        const item = items.find(
            (certificate) =>
                certificate.id === id
        );

        if (!item) return;

        const result =
            await updateCertificate(
                id,
                {
                    name: item.name,
                    year: item.year ?? undefined,
                }
            );

        if (!result.success || !result.data) {
            showError(
                result.error
            );
            return;
        }

        setItems((prev) =>
            prev.map((certificate) =>
                certificate.id === id
                    ? result.data
                    : certificate
            )
        );

        setEditingId(null);
        showSuccess("Сертификат обновлён");
    }

    async function handleImageUpdate(
        id: string,
        image: string
    ) {
        const result =
            await updateDoctorCertificate(
                id,
                image
            );

        if (!result.success || !result.data) {
            showError(
                result.error
            );
            return;
        }

        setItems((prev) =>
            prev.map((certificate) =>
                certificate.id === id
                    ? {
                          id: result.data!.id,
                          image: result.data!.image,
                          name: certificate.name,
                          year: certificate.year,
                      }
                    : certificate
            )
        );
        showSuccess("Изображение заменено");
    }

    return (
        <section className="space-y-4 border-t pt-6">
            <div>
                <h2 className="text-base font-medium">
                    Сертификаты
                </h2>

                <p className="text-sm text-muted-foreground">
                    Документы и подтверждение квалификации врача.
                </p>
            </div>

            <div className="space-y-3 rounded-lg border p-4">
                <Input
                    placeholder="Название сертификата"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <Input
                    placeholder="Год"
                    type="number"
                    value={year}
                    onChange={(e) =>
                        setYear(e.target.value)
                    }
                />

                <CertificateUpload
                    onUpload={setImage}
                />

                <Button
                    type="button"
                    onClick={handleCreate}
                >
                    Добавить сертификат
                </Button>
            </div>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-lg border p-4"
                    >
                        {editingId === item.id ? (
                            <Input
                                value={item.name}
                                onChange={(e) =>
                                    setItems((prev) =>
                                        prev.map((certificate) =>
                                            certificate.id === item.id
                                                ? {
                                                    ...certificate,
                                                    name: e.target.value,
                                                }
                                                : certificate
                                        )
                                    )
                                }
                            />
                        ) : (
                            <p className="font-medium">
                                {item.name}
                            </p>
                        )}
                        {item.year && (
                            <p className="text-sm text-muted-foreground">
                                {item.year}
                            </p>
                        )}

                        <div className="mt-3 overflow-hidden rounded-md">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-20 w-32 object-cover"
                            />
                        </div>
                        <CertificateUpload
                            onUpload={(url) =>
                                handleImageUpdate(
                                    item.id,
                                    url
                                )
                            }
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                editingId === item.id
                                    ? handleUpdate(item.id)
                                    : setEditingId(item.id)
                            }
                        >
                            {editingId === item.id
                                ? "Сохранить"
                                : "Изменить"}
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                                handleDelete(item.id)
                            }
                        >
                            Удалить
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
}