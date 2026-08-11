import { toast } from "sonner";

export function showError(
    message?: string
) {
    toast.error(
        message ?? "Произошла ошибка"
    );
}

export function showSuccess(
    message: string
) {
    toast.success(message);
}

export function showWarning(
    message: string
) {
    toast.warning(message);
}