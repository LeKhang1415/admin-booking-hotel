import { createContext, useContext, type ReactNode } from "react";

type TableContextType = {
    columns: string;
};

const TableContext = createContext<TableContextType | null>(null);

type TableProps = {
    columns: string;
    children: ReactNode;
};

function Table({ columns, children }: TableProps) {
    return (
        <div className="overflow-x-auto">
            <TableContext.Provider value={{ columns }}>
                <div
                    role="table"
                    className="text-sm bg-surface rounded-md overflow-hidden min-w-[1147px] table-fixed shadow-card border border-border"
                >
                    {children}
                </div>
            </TableContext.Provider>
        </div>
    );
}

function Header({ children }: { children: ReactNode }) {
    const ctx = useContext(TableContext);
    if (!ctx) throw new Error("Header must be used inside <Table>");
    return (
        <header
            role="row"
            style={{ gridTemplateColumns: ctx.columns }}
            className="grid gap-x-6 items-center px-6 py-4 bg-accent border-b border-border text-black uppercase tracking-[0.4px] font-semibold"
        >
            {children}
        </header>
    );
}

function Row({ children }: { children: ReactNode }) {
    const ctx = useContext(TableContext);
    if (!ctx) throw new Error("Row must be used inside <Table>");
    return (
        <div
            role="row"
            style={{ gridTemplateColumns: ctx.columns }}
            className="grid gap-x-6 items-center px-6 py-3 hover:bg-yellow-100/50 transition-colors duration-200 border-b border-border/30"
        >
            {children}
        </div>
    );
}

type BodyProps<T> = {
    data: T[];
    render: (item: T) => ReactNode;
};

function Body<T>({ data, render }: BodyProps<T>) {
    if (!data.length)
        return (
            <p className="text-lg font-medium text-center my-6 text-muted-2 bg-cream p-8 rounded-md">
                No data to show at the moment
            </p>
        );

    return <section className="bg-card-bg">{data.map(render)}</section>;
}

function Footer({ children }: { children?: ReactNode }) {
    if (!children) return null;
    return <footer className="bg-yellow-100 p-2">{children}</footer>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
