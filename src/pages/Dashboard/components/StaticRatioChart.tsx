import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../../../services/booking.api";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { BookingStatus } from "../../../types/booking.types";

const STATUS_CONFIG: Record<
    BookingStatus,
    { color: string; bgColor: string; textColor: string }
> = {
    unpaid: {
        color: "#f59e0b",
        bgColor: "bg-amber-50",
        textColor: "text-amber-700",
    },
    paid: {
        color: "#10b981",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-700",
    },
    checked_in: {
        color: "#3b82f6",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
    },
    completed: {
        color: "#8b5cf6",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
    },
    cancelled: {
        color: "#ef4444",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
    },
    rejected: {
        color: "#6b7280",
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
    },
    no_show: {
        color: "#14b8a6",
        bgColor: "bg-teal-50",
        textColor: "text-teal-700",
    },
};

const STATUS_ORDER: BookingStatus[] = [
    "unpaid",
    "paid",
    "checked_in",
    "completed",
    "cancelled",
    "rejected",
    "no_show",
];

const CustomLegend = ({
    payload,
}: {
    payload: { status: BookingStatus; count: number }[];
}) => {
    const total = payload.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 mt-6">
            {payload.map((entry, index) => {
                const config = STATUS_CONFIG[entry.status];
                const percentage = ((entry.count / total) * 100).toFixed(1);

                return (
                    <div
                        key={`legend-${index}`}
                        className={`${config.bgColor} rounded-lg p-3 border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105`}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div
                                    className={`font-semibold capitalize ${config.textColor}`}
                                >
                                    {entry.status.replace("_", " ")}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {entry.count} booking
                                </div>
                            </div>
                            <div className="text-right">
                                <div
                                    className={`font-bold text-lg ${config.textColor}`}
                                >
                                    {percentage}%
                                </div>
                                <div
                                    className="w-3 h-3 rounded-full ml-auto"
                                    style={{ backgroundColor: config.color }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default function StatusRatioChart() {
    const currentYear = new Date().getFullYear();

    const { data, isLoading } = useQuery({
        queryKey: ["status-ratio"],
        queryFn: () => bookingApi.getStatusRatio({ year: currentYear }),
    });

    if (isLoading) return null;

    const statusRatioData = data?.data.data || [];

    const dataChart: { status: BookingStatus; count: number }[] =
        STATUS_ORDER.map((status) => ({
            status,
            count: statusRatioData.find((s) => s.status === status)?.count || 0,
        }));

    const total = dataChart.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* 🥧 Biểu đồ tròn */}
                <div className="relative">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-inner">
                        <ResponsiveContainer width={320} height={320}>
                            <PieChart>
                                <Pie
                                    data={dataChart}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    innerRadius={60}
                                    dataKey="count"
                                    paddingAngle={2}
                                    animationBegin={0}
                                    animationDuration={800}
                                >
                                    {dataChart.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                STATUS_CONFIG[entry.status]
                                                    .color
                                            }
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg">
                            <div className="text-2xl font-bold text-gray-800">
                                {total}
                            </div>
                            <div className="text-sm text-gray-600">Total</div>
                        </div>
                    </div>
                </div>

                {/* 🧩 Custom Legend */}
                <div className="flex-1 max-w-sm">
                    <CustomLegend payload={dataChart} />
                </div>
            </div>
        </div>
    );
}
