import classNames from "classnames";

type BodyProps = {
    bodyData: any;
    render: (data: any) => React.ReactNode;
};

type Props = {
    data?: string[];
    className?: string;
    children?: React.ReactNode;
};

export default function Table({ children }: Props) {
    return (
        <table className="mt-3 w-full text-sm table-auto md:table-fixed ">
            {children}
        </table>
    );
}

function Header({ data, className }: Props) {
    return (
        <thead className={classNames("bg-gray-600 border-b ", className)}>
            <tr>
                {data?.map((ele, index) => (
                    <th
                        key={ele}
                        scope="col"
                        className={`p-4 text-left text-md font-bold text-white tracking-wide uppercase ${
                            index === 0 ? "rounded-tl-xl" : ""
                        } ${index === data.length - 1 ? "rounded-tr-xl" : ""}`}
                    >
                        {ele}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

function Body({ bodyData, render }: BodyProps) {
    return <tbody className="bg-primary">{bodyData.map(render)}</tbody>;
}

Table.Header = Header;
Table.Body = Body;
