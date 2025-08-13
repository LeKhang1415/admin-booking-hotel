import classNames from "classnames";

type BodyProps = {
    bodyData: any;
    render: (data: any) => React.ReactNode;
};

type Props = {
    header?: string[];
    className?: string;
    children?: React.ReactNode; // Nội dung bên trong (ví dụ Table.Header, Table.Body)
};

export default function Table({ children }: Props) {
    return <table className=" mt-3 w-full text-sm">{children}</table>;
}

function Header({ header, className }: Props) {
    return (
        <thead className={classNames("bg-[#202020]", className)}>
            <tr>
                {header &&
                    header?.map((headerElement) => (
                        <th
                            key={headerElement}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider text-nowrap"
                        >
                            {headerElement}
                        </th>
                    ))}
            </tr>
        </thead>
    );
}

function Body({ bodyData, render }: BodyProps) {
    if (!bodyData.length)
        return (
            <tbody className="text-3xl text-white">
                <tr>
                    <td>
                        <p className="uppercase font-semibold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            Không có dữ liệu
                        </p>
                    </td>
                </tr>
            </tbody>
        );
    return (
        <tbody className="bg-[#202020] divide-y divide-gray-200">
            {bodyData.map(render)}
        </tbody>
    );
}

Table.Header = Header;
Table.Body = Body;
