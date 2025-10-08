import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../../../services/booking.api";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    LabelList,
} from "recharts";
import { formatCurrency } from "../../../utils/utils";
import SummaryCard from "./SummaryCard";

function MonthlyRevenueChart() {
    const currentYear = new Date().getFullYear();

    const { data, isLoading } = useQuery({
        queryKey: ["monthly-revenue", currentYear],
        queryFn: () => bookingApi.getIncomeStatistics({ year: currentYear }),
    });

    if (isLoading) return <p>Loading...</p>;

    // ✅ Lấy đúng dữ liệu từ response
    const monthlyRevenueData = data?.data.data.monthlyData || [];

    // Chuẩn hóa dữ liệu cho 12 tháng
    const dataChart = Array(12)
        .fill(0)
        .map((_, index) => {
            const monthData = monthlyRevenueData.find(
                (m) => m.month === index + 1
            );
            return {
                month: index + 1,
                totalBooking: monthData ? monthData.bookingCount : 0,
                totalRevenue: monthData ? monthData.totalRevenue : 0,
            };
        });

    const totalRevenue = data?.data.data.totalRevenue ?? 0;
    const totalBooking = data?.data.data.totalBookings ?? 0;

    const avgRevenuePerBooking = data?.data.data.averageRevenuePerMonth ?? 0;

    return (
        <>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard
                    title="Total Revenue"
                    value={formatCurrency(totalRevenue)}
                />
                <SummaryCard
                    title="Total Bookings"
                    value={totalBooking.toString()}
                />
                <SummaryCard
                    title="Revenue / Booking"
                    value={formatCurrency(avgRevenuePerBooking)}
                />
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={dataChart}
                        margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
                        barCategoryGap="20%"
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#1e90ff"
                            strokeOpacity={0.5}
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#1e90ff",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                            dy={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#1e90ff", fontSize: 12 }}
                            tickFormatter={(value) =>
                                `${(value / 1000000).toFixed(0)}M`
                            }
                        />

                        <Tooltip cursor={{ fill: "rgba(79, 209, 197, 0.1)" }} />

                        <Legend
                            wrapperStyle={{
                                paddingTop: "20px",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                            iconType="circle"
                        />

                        <Bar
                            dataKey="totalRevenue"
                            name="Revenue (đ)"
                            radius={[6, 6, 0, 0]}
                            fill="url(#colorGradient)"
                        >
                            <LabelList dataKey="totalBooking" position="top" />
                        </Bar>

                        <defs>
                            <linearGradient
                                id="colorGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#1e90ff"
                                    stopOpacity={1}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#1e90ff"
                                    stopOpacity={0.8}
                                />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default MonthlyRevenueChart;
