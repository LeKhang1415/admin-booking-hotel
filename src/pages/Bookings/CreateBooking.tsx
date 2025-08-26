import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";
import type {
    BookingPreviewDto,
    CreateBookingDto,
} from "../../types/booking.types";
import usePreviewBooking from "./hooks/usePreviewBooking";
import BookingPreviewCard from "./components/BookingPreviewCard";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import type { SelectOptsType } from "../../types/utils.type";
import { customerFormSchema, type CustomerFormSchema } from "../../utils/rule";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { bookingApi } from "../../services/booking.api";
import Spinner from "../../components/Spinner";
import { useDispatch } from "react-redux";
import { resetBooking } from "../../store/slices/bookingSlice";

const mapPriceTypeToStayType = {
    hour: "hourly",
    day: "daily",
} as const;

type FormData = CustomerFormSchema;

function CreateBooking() {
    const booking = useSelector((state: RootState) => state.booking);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    // Nếu chưa có phòng hoặc startTime/endTime → quay lại available-rooms
    useEffect(() => {
        if (!booking.room || !booking.startTime || !booking.endTime) {
            navigate("/available-rooms", { replace: true });
        }
    }, [booking, navigate]);

    const previewPayload: BookingPreviewDto = {
        roomId: booking.room?.id || "",
        startTime: booking.startTime?.toISOString() || "",
        endTime: booking.endTime?.toISOString() || "",
        stayType: mapPriceTypeToStayType[booking.priceType],
        numberOfGuest: booking.numberOfPeople,
    };

    const { preview, isLoading } = usePreviewBooking(previewPayload);

    // Mutation để tạo booking
    const { mutate, isPending } = useMutation({
        mutationFn: (payload: CreateBookingDto) =>
            bookingApi.createBooking(payload),
        onSuccess: () => {
            toast.success("Booking created successfully!");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            dispatch(resetBooking());
            navigate("/bookings");
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message?: string }>;
            toast.error(
                axiosError.response?.data?.message || "Booking failed!"
            );
        },
    });

    const onSubmit = (data: FormData) => {
        // Merge data từ store (previewPayload) + dữ liệu form
        const finalPayload: CreateBookingDto = {
            ...previewPayload,
            bookingType: data.bookingType,
            customerFullName: data.customerFullName,
            customerPhone: data.customerPhone,
            customerEmail: data.customerEmail || undefined,
            customerIdentityCard:
                data.customerIdentityCard?.trim() || undefined,
        };

        // Gọi API
        mutate(finalPayload);
    };

    const bookingTypeOpts: SelectOptsType[] = [
        { label: "Online", value: "online" },
        { label: "Walk in", value: "walk_in" },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(customerFormSchema) as any,
    });

    if (!booking.room) return null;

    if (isLoading) {
        return (
            <div className="h-full flex justify-center items-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!preview?.room) return null;

    return (
        <div>
            <div className="bg-primary p-8 rounded-xl shadow-sm w-full mx-auto mb-5">
                <h2 className="text-2xl text-white font-bold mb-1">
                    Create Booking
                </h2>

                <button
                    onClick={() => navigate(-1)}
                    className="text-yellow-500 text-md hover:text-yellow-300 transition"
                >
                    ← Go Back
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                {/* LEFT: Preview */}
                <div>
                    <BookingPreviewCard
                        room={preview.room}
                        startDate={new Date(booking.startTime!)}
                        endDate={new Date(booking.endTime!)}
                        numberOfPeople={booking.numberOfPeople!}
                        priceType={booking.priceType}
                        totalPrice={preview.totalAmount}
                    />
                </div>
                {/* RIGHT: Form */}
                <div className="p-6 bg-primary rounded-xl shadow ">
                    <h2 className="text-lg font-semibold mb-4">
                        Customer Information
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                        noValidate
                    >
                        {/* Booking Type */}
                        <div>
                            <Select
                                name="bookingType"
                                label="Booking Type"
                                register={register}
                                errorMessage={errors?.bookingType?.message}
                                options={bookingTypeOpts}
                            />
                        </div>

                        {/* Full Name */}
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="Enter full name"
                            name="customerFullName"
                            register={register}
                            errorMessage={errors?.customerFullName?.message}
                            required
                        />

                        {/* Phone */}
                        <Input
                            label="Phone Number"
                            type="text"
                            placeholder="Enter phone number"
                            name="customerPhone"
                            register={register}
                            errorMessage={errors?.customerPhone?.message}
                            required
                        />

                        {/* Email */}
                        <Input
                            label="Email (optional)"
                            type="email"
                            placeholder="Enter email"
                            name="customerEmail"
                            register={register}
                            errorMessage={errors?.customerEmail?.message}
                        />

                        {/* Identity Card */}
                        <Input
                            label="Identity Card (optional)"
                            type="text"
                            placeholder="Enter identity card"
                            name="customerIdentityCard"
                            register={register}
                            errorMessage={errors?.customerIdentityCard?.message}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                className="px-4 py-2 text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                                onClick={() => navigate(-1)}
                                disabled={isPending}
                            >
                                Cancel
                            </button>
                            <Button
                                type="submit"
                                isLoading={isPending}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Create Booking
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateBooking;
