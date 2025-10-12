import Heading from "../../components/Heading";
import Main from "../../components/Main";
import MonthlyRevenueChart from "./components/MonthlyRevenueChart";
import StaticRatioChart from "./components/StaticRatioChart";
import TopBooked from "./components/TopBooked";

function Dashboard() {
    return (
        <Main>
            <Heading>
                <h1 className="text-3xl font-bold text-text">DashBoard</h1>
            </Heading>
            <div className="bg-bg from-slate-50 to-blue-50 p-6 rounded-xl shadow-lg h-full overflow-auto">
                <MonthlyRevenueChart />
                <div className="flex mt-8 gap-4">
                    <StaticRatioChart />
                    <TopBooked />
                </div>
            </div>
        </Main>
    );
}

export default Dashboard;
