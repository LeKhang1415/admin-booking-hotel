interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number | string | undefined;
    bg?: string; // màu nền icon
}

function StatCard({ icon, title, value, bg = "bg-blue-100" }: StatCardProps) {
    return (
        <div className="bg-card-bg rounded-lg w-full shadow shadow-card p-6">
            <div className="flex items-center">
                <div
                    className={`${bg} rounded-lg p-3 flex items-center justify-center`}
                >
                    {icon}
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
}

export default StatCard;
