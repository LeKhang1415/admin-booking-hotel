import classNames from "classnames";
import type { Payment } from "../../../types/payment.types";
import { formatCurrency, formatDate } from "../../../utils/utils";

const successCss = {
    bg: "bg-green-50",
    subtext: "text-green-600",
    text: "text-green-800",
    mediumText: "text-green-700",
    icon: "fas fa-check-circle",
};

export default function PaymentDetail({ payments }: { payments: Payment[] }) {
    // lọc chỉ lấy payment thành công
    const successfulPayments = payments.filter((p) => p.status === "success");

    if (successfulPayments.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                No successful payments found
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {successfulPayments.map((payment) => (
                <div
                    key={payment.paymentId}
                    className="p-6 space-y-6 rounded-lg shadow-sm bg-white"
                >
                    {/* Thông tin tổng quan */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                            <span className="text-gray-600">Amount</span>
                            <span className="text-xl font-bold text-gray-800">
                                {formatCurrency(payment.amount)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Created at</span>
                            <span className="font-medium">
                                {formatDate(payment.createdAt, true)}
                            </span>
                        </div>
                    </div>

                    {/* Trạng thái thanh toán */}
                    <div
                        className={classNames("p-4 rounded-lg", successCss.bg)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <i
                                    className={classNames(
                                        successCss.icon,
                                        "mr-2",
                                        successCss.subtext
                                    )}
                                />
                                <span
                                    className={classNames(
                                        "font-medium uppercase",
                                        successCss.text
                                    )}
                                >
                                    Paid
                                </span>
                            </div>
                            <span
                                className={classNames(
                                    "text-sm",
                                    successCss.subtext
                                )}
                            >
                                {payment.paidAt
                                    ? formatDate(payment.paidAt, true)
                                    : "—"}
                            </span>
                        </div>
                        <div
                            className={classNames(
                                "mt-2 text-sm",
                                successCss.mediumText
                            )}
                        >
                            • Method:{" "}
                            <span className="capitalize">
                                {payment.paymentMethod}
                            </span>
                            <p>• Payment ID: {payment.paymentCode}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
