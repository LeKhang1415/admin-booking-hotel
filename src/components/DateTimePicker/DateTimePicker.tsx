import { Controller, type Control } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";

interface DateTimePickerProps {
    name: string;
    label: string;
    control: Control<any>;
    errorMessage?: string;
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
    showTimeSelect?: boolean;
    dateFormat?: string;
}

const CustomInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick, placeholder, className }, ref) => (
        <input
            ref={ref}
            value={value}
            onClick={onClick}
            placeholder={placeholder}
            readOnly
            className={className}
        />
    )
);

CustomInput.displayName = "CustomInput";

function DateTimePicker({
    name,
    label,
    control,
    errorMessage,
    placeholder,
    minDate,
    maxDate,
    showTimeSelect = true,
    dateFormat = "dd/MM/yyyy HH:mm",
}: DateTimePickerProps) {
    return (
        <div>
            <label className="block mb-1 font-medium capitalize text-white">
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <DatePicker
                        selected={value}
                        onChange={(date: Date | null) => onChange(date)}
                        showTimeSelect={showTimeSelect}
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat={dateFormat}
                        placeholderText={placeholder}
                        minDate={minDate}
                        maxDate={maxDate}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 `}
                        customInput={
                            <CustomInput
                                className={`w-full border text-white border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 h-[40px] min-w-64 text-sm `}
                                placeholder={placeholder}
                            />
                        }
                        popperClassName="z-50"
                        popperPlacement="bottom-start"
                    />
                )}
            />

            {errorMessage && (
                <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            )}
        </div>
    );
}

export default DateTimePicker;
