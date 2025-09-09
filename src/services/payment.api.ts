import type {
    Payment,
    PaymentListQuery,
    PaymentResponse,
    VnpayData,
} from "../types/payment.types";
import type { SuccessResponseApi } from "../types/utils.type";
import http from "../utils/http";

export const paymentApi = {
    getAll: (params: PaymentListQuery) =>
        http.get<SuccessResponseApi<PaymentResponse>>("/payment/all", {
            params,
        }),
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
