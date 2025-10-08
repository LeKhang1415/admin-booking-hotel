function SummaryCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{value}</div>
            <div className="text-sm text-gray-600">{title}</div>
        </div>
    );
}

export default SummaryCard;
