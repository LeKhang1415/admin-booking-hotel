import type { Booking } from "./booking.types";

export const PaymentMethod = {
    CASH: "Cash",
    VNPAY: "Vnpay",
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentStatus = {
    PENDING: "pending",
    PROCESSING: "processing",
    SUCCESS: "success",
    FAILED: "failed",
    REFUNDED: "refunded",
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentType = {
    BOOKING_PAYMENT: "booking_payment",
    LATE_CHECKOUT_FEE: "late_checkout_fee",
} as const;
export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export interface Payment {
    paymentId: string;
    paymentCode: string;
    amount: number;
    paymentMethod: PaymentMethod;
    paidAt?: string;
    status: PaymentStatus;
    paymentType: PaymentType;
    booking: Booking;
    createdAt: string;
}
