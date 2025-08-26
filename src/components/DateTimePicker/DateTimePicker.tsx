import { Controller, type Control } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import { PiCalendarCheckFill } from "react-icons/pi";

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
    ({ value, onClick, placeholder }, ref) => {
        return (
            <div onClick={onClick} className="relative w-full">
                <input
                    ref={ref}
                    value={value || ""}
                    readOnly
                    placeholder={placeholder || "DD/MM/YYYY HH:MM"}
                    className="w-full h-10 px-3 pr-10 bg-card-bg border border-border rounded-lg text-sm placeholder:text-muted-2 text-text focus:outline-none focus:ring-2 focus:ring-focus focus:border-accent"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <PiCalendarCheckFill className="w-5 h-5 text-muted-2" />
                </div>
            </div>
        );
    }
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
            <label className="block mb-1 font-medium capitalize text-muted">
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
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-focus focus:border-accent bg-card-bg text-text"
                        customInput={
                            <CustomInput
                                className="w-full border text-text border-border rounded-lg px-3 py-2 focus:outline-none h-[40px] min-w-64 text-sm"
                                placeholder={placeholder}
                            />
                        }
                        popperClassName="bg-card-bg text-text shadow-card border border-border z-50"
                        popperPlacement="bottom-start"
                    />
                )}
            />

            {errorMessage && (
                <p className="mt-1 text-sm text-danger">{errorMessage}</p>
            )}
        </div>
    );
}

export default DateTimePicker;
