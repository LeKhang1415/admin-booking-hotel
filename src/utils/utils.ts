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

export function timeAgo(isoDate: Date) {
    const date = new Date(isoDate);
    const now = new Date();

    if (isNaN(date.getTime())) return null;

    const second = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (second < 60) return "Vừa xong";

    const minutes = Math.floor(second / 60);
    if (minutes < 60) return `${minutes} phút trước`;

    const hours = Math.floor(second / 3600);
    if (hours < 24) return `${hours} giờ trước`;

    const days = Math.floor(second / 86400);
    if (days < 7) return `${days} ngày trước`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} tuần trước`;

    const months =
        (now.getFullYear() - date.getFullYear()) * 12 +
        (now.getMonth() - date.getMonth());
    if (months < 12) return `${months} tháng trước`;

    const years = Math.floor(months / 12);
    return `${years} năm trước`;
}
