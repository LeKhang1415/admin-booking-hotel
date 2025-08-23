import { format } from "date-fns";

export function formatCurrency(value: number): string {
    return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}

export function formatDate(date: string | Date, detail: boolean = false) {
    return format(
        new Date(date),
        detail ? "dd-MM-yyyy HH:mm:ss" : "dd-MM-yyyy"
    );
}

export const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
