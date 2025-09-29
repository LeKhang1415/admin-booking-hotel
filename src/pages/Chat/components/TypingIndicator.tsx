export default function TypingIndicator({ userName }: { userName?: string }) {
    return (
        <div className="inline-flex items-center gap-1 rounded-2xl ml-3">
            <span className=" italic text-gray-500">
                {userName ? `${userName} is typing` : "Someone is typing"}
            </span>
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#d1d1d1] animate-bounce"
                    style={{ animationDelay: `${i * 0.3}s` }}
                />
            ))}
        </div>
    );
}
