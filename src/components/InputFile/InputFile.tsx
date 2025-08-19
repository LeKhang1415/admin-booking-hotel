import { type UseFormRegister } from "react-hook-form";

type PropsType = {
    name: string;
    label?: string;
    multiple?: boolean;
    errorMessage?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
};

export default function InputFile({
    multiple,
    label,
    errorMessage,
    name,
    register,
}: PropsType) {
    const registerResult = name && register ? register(name) : null;
    return (
        <>
            <label className="block mb-1 font-medium capitalize text-white">
                {label}
            </label>
            <input
                multiple={multiple}
                {...registerResult}
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                type="file"
            />
            {errorMessage && (
                <span className="text-xs text-red-500 text-nowrap">
                    {errorMessage}
                </span>
            )}
        </>
    );
}
