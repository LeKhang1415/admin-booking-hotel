import { type UseFormRegister } from "react-hook-form";
import { useState } from "react";

type PropsType = {
    name: string;
    label?: string;
    multiple?: boolean;
    errorMessage?: string;
    previewUrl?: string; // 👈 thêm prop này để hiển thị ảnh cũ
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
};

export default function InputFile({
    multiple,
    label,
    errorMessage,
    name,
    register,
    previewUrl,
}: PropsType) {
    const registerResult = name && register ? register(name) : null;
    const [preview, setPreview] = useState<string | null>(previewUrl || null);

    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            {label && (
                <label className="block mb-1 font-medium capitalize text-white">
                    {label}
                </label>
            )}

            <input
                multiple={multiple}
                {...registerResult}
                onChange={(e) => {
                    handlePreview(e);
                    registerResult?.onChange?.(e); // Gọi lại onChange của react-hook-form
                }}
                className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200
                   file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                   file:text-sm file:font-semibold file:bg-blue-600 file:text-white 
                   hover:file:bg-blue-700"
                type="file"
            />

            {/* Hiển thị preview */}
            {preview && (
                <div className="mt-2">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-32 rounded-md border border-gray-600 object-cover"
                    />
                </div>
            )}

            {errorMessage && (
                <span className="text-xs text-red-500 text-nowrap">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
