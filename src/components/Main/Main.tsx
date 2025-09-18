import classNames from "classnames";

export default function Main({
    cssClasses = "",
    children,
}: {
    cssClasses?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={classNames(
                "relative flex-1 flex space-y-4 flex-col bg-main rounded-2xl shadow-custom h-full w-full",
                cssClasses
            )}
        >
            {children}
        </div>
    );
}
