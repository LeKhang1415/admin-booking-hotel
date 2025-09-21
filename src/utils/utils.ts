import { format } from "date-fns";

export function formatCurrency(value: number): string {
    return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

export function formatDate(
    date: string | Date,
    detail: boolean = false,
    reverse: boolean = false
) {
    return format(
        new Date(date),
        detail
            ? reverse
                ? "HH:mm dd-MM-yyyy"
                : "dd-MM-yyyy HH:mm"
            : reverse
            ? "yyyy-MM-dd"
            : "dd-MM-yyyy"
    );
}

export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
        date: date.toLocaleDateString("vi-VN"),
        time: date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        }),
        full: date.toLocaleString("vi-VN"),
    };
};

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

export function timeAgo(isoDate: string) {
    const date = new Date(isoDate);
    const now = new Date();

    if (isNaN(date.getTime())) return null;

    const second = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (second < 60) return "Just now";

    const minutes = Math.floor(second / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(second / 3600);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(second / 86400);
    if (days < 7) return `${days} days ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} weeks ago`;

    const months =
        (now.getFullYear() - date.getFullYear()) * 12 +
        (now.getMonth() - date.getMonth());
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(months / 12);
    return `${years} year ago`;
}

export function truncateText(text: string, maxLength: number) {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
