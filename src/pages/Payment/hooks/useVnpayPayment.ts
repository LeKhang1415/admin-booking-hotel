import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { paymentApi } from "../../../services/payment.api";

function useVnpayPayment() {
    return useMutation({
        mutationFn: async (bookingId: string) => {
            return await paymentApi.createVnpayPayment(bookingId);
        },
        onSuccess: (res) => {
            if (res.data.data.url) {
                toast.success("Đang chuyển hướng đến VNPay...");
                window.location.href = res.data.data.url;
            } else {
                toast.error("Không lấy được link VNPay!");
            }
        },
        onError: () => {
            toast.error("Thanh toán VNPay thất bại!");
        },
    });
}

export default useVnpayPayment;
