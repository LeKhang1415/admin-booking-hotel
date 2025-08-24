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

export function fromTimestamp(value?: string | number, detail = false): string {
    if (!value) return "";
    const num = typeof value === "string" ? Number(value) : value;
    const d = new Date(num);
    if (isNaN(d.getTime())) return "";
    return formatDate(d, detail);
}

export const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export function cleanObject<T extends Record<string, any>>(obj: T): T {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined)
    ) as T;
}

export function parseString(text: string): string[] {
    if (!text) return [];

    return text
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
}
