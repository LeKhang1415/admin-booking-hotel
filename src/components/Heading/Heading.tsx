export default function Heading({
    children,
}: {
    children: React.ReactElement;
}) {
    return (
        <div className="mt-4 flex justify-between align-center flex-wrap">
            {children}
        </div>
    );
}
