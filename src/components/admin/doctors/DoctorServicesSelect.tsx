"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface Service {
    id: string;
    name: string;
}

interface Props {
    services: Service[];
    selectedServices: string[];
    onChange: (services: string[]) => void;
}

export function DoctorServicesSelect({
    services,
    selectedServices,
    onChange,
}: Props) {
    function handleChange(
        serviceId: string,
        checked: boolean
    ) {
        if (checked) {
            onChange([
                ...selectedServices,
                serviceId,
            ]);

            return;
        }

        onChange(
            selectedServices.filter(
                (id) => id !== serviceId
            )
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="font-medium">
                Услуги врача
            </h3>

            {services.map((service) => (
                <div
                    key={service.id}
                    className="flex items-center gap-3"
                >
                    <Checkbox
                        checked={selectedServices.includes(
                            service.id
                        )}
                        onCheckedChange={(checked) =>
                            handleChange(
                                service.id,
                                checked === true
                            )
                        }
                    />

                    <span>
                        {service.name}
                    </span>
                </div>
            ))}

            {services.length === 0 && (
                <p className="text-sm text-muted-foreground">
                    Нет доступных услуг.
                </p>
            )}
        </div>
    );
}