import type { Payment, VnpayData } from "../types/payment.types";
import type { SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const paymentApi = {
    createVnpayPayment: (bookingId: string) =>
        http.post<SuccessResponseApi<VnpayData>>(
            `/payment/online/${bookingId}`
        ),
    createCashPayment: (bookingId: string) =>
        http.post<SuccessResponseApi<Payment>>(`/payment/walkin/${bookingId}`),

    confirmCashPayment: (paymentCode: string) =>
        http.post<SuccessResponseApi<Payment>>(
            `/payment/walkin/confirm/${paymentCode}`
        ),
};
