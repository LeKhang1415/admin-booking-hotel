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
                    className="text-sm bg-primary rounded-md overflow-hidden min-w-[1147px] table-fixed" // 👈 bảng sẽ không nhỏ hơn 900px
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
            className="grid gap-x-6 items-center px-6 py-4 bg-primary border-b border-gray-100 text-white uppercase tracking-[0.4px] font-semibold "
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
            className="grid gap-x-6 items-center px-6 py-3"
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
            <p className="text-[1.6rem] font-medium text-center my-6">
                No data to show at the moment
            </p>
        );

    return <section className="my-1">{data.map(render)}</section>;
}

function Footer({ children }: { children?: ReactNode }) {
    if (!children) return null;
    return <footer className="bg-primary">{children}</footer>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
