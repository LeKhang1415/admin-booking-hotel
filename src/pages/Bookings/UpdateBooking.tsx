import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import useBooking from "./hooks/useBooking";
import DateTimePicker from "../../components/DateTimePicker";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { capitalizeFirst } from "../../utils/utils";
import useAllRooms from "../Rooms/hooks/useAllRooms";
import type { SelectOptsType } from "../../types/utils.type";

export interface BookingFormData {
    roomId: string;
    customerFullName: string;
    customerPhone: string;
    customerEmail?: string;
    customerIdentityCard?: string;
    numberOfPeople: number;
    startTime: Date;
    stayType: string;
    endTime: Date;
}

const statusColor: Record<string, string> = {
    unpaid: "bg-danger text-on-danger",
    paid: "bg-success text-on-success",
    checked_in: "bg-accent text-on-accent",
    checked_out: "bg-warm text-on-warm",
};

function UpdateBooking() {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const { booking, isLoading } = useBooking(id);
    const { rooms } = useAllRooms();

    const roomOpts: SelectOptsType[] = useMemo(
        () =>
            rooms?.map((r) => ({
                label: r.name,
                value: r.id,
            })) || [],
        [rooms]
    );

    // Gọi hooks luôn ở trên, không đặt sau điều kiện return
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<BookingFormData>({
        // không truyền defaultValues phụ thuộc booking tại đây để tránh bất ổn
        defaultValues: {
            customerFullName: "",
            customerPhone: "",
            customerEmail: "",
            customerIdentityCard: "",
            numberOfPeople: 1,
            startTime: new Date(),
            endTime: new Date(),
            stayType: "daily",
        },
    });

    // Khi booking về, reset form với dữ liệu thực tế
    useEffect(() => {
        if (!booking) return;
        reset({
            customerFullName: booking.customer.fullName ?? "",
            customerPhone: booking.customer.phone ?? "",
            customerEmail: booking.customer.email ?? "-",
            customerIdentityCard: booking.customer.identityCard ?? "-",
            roomId: booking.room.id,
            numberOfPeople: booking.numberOfGuest ?? 1,
            startTime: booking.startTime
                ? new Date(booking.startTime)
                : new Date(),
            endTime: booking.endTime ? new Date(booking.endTime) : new Date(),
            stayType: booking.stayType ?? "daily",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [booking, reset]);

    // // mutation update booking (thay bằng API của bạn)
    // const { mutate: updateBooking } = useMutation({
    //     mutationFn: (body: any) => bookingApi.updateBooking({ id: id!, body }),
    //     onSuccess: () => {
    //         toast.success("Cập nhật booking thành công");
    //         queryClient.invalidateQueries({ queryKey: ["booking", id] });
    //         queryClient.invalidateQueries({ queryKey: ["bookings"] });
    //     },
    //     onError: (err: any) => {
    //         const msg = err?.response?.data?.message || "Cập nhật thất bại";
    //         toast.error(msg);
    //     },
    // });

    // Nếu đang loading hoặc không tìm thấy
    if (isLoading) return <div>Loading...</div>;
    if (!booking) return <div>Không tìm thấy booking</div>;

    const onSubmit = (data: BookingFormData) => {
        // chuyển dữ liệu theo format backend muốn
        // const payload = {
        //     customer: {
        //         fullName: data.customerFullName,
        //         phone: data.customerPhone,
        //         email: data.customerEmail,
        //         identityCard: data.customerIdentityCard,
        //     },
        //     numberOfGuest: Number(data.numberOfPeople),
        //     startTime: data.startTime.toISOString(),
        //     endTime: data.endTime.toISOString(),
        //     stayType: data.stayType,
        // };
        // updateBooking(payload);
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center max-w-6xl bg-bg p-6 rounded-xl shadow shadow-card w-full mx-auto mb-5">
                <div>
                    <h2 className="text-2xl text-black font-bold mb-1">
                        Update Booking
                    </h2>
                    <p className="text-muted text-md ">{`Booking ID: ${booking.bookingId}`}</p>
                </div>
                <div className="flex items-center gap-4">
                    <span
                        className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${
                            statusColor[booking.bookingStatus] ||
                            "bg-elevated text-text"
                        }`}
                    >
                        {capitalizeFirst(booking.bookingStatus)}
                    </span>
                </div>
            </div>

            {/* Main */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                        noValidate
                    >
                        <section className="bg-bg rounded-lg shadow p-5">
                            <h2 className="text-lg font-semibold mb-3">
                                Customer information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input
                                    {...register("customerFullName", {
                                        required: true,
                                    })}
                                    name="customerFullName"
                                    label="Full name"
                                    placeholder="Enter full name"
                                    errorMessage={
                                        errors.customerFullName?.message as any
                                    }
                                />

                                <Input
                                    {...register("customerPhone", {
                                        required: true,
                                    })}
                                    name="customerPhone"
                                    label="Phone Number"
                                    placeholder="Enter phone"
                                    errorMessage={
                                        errors.customerPhone?.message as any
                                    }
                                />

                                <Input
                                    {...register("customerEmail")}
                                    name="customerEmail"
                                    label="Email"
                                    placeholder="Enter email"
                                    errorMessage={
                                        errors.customerEmail?.message as any
                                    }
                                />

                                <Input
                                    {...register("customerIdentityCard")}
                                    name="customerIdentityCard"
                                    label="Identity card"
                                    placeholder="Enter identity card"
                                    errorMessage={
                                        errors.customerIdentityCard
                                            ?.message as any
                                    }
                                />
                            </div>
                        </section>

                        <section className="bg-bg rounded-lg shadow p-5">
                            <h2 className="text-lg font-semibold mb-3">
                                Stay information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <DateTimePicker
                                    name="startTime"
                                    label="Start Time"
                                    placeholder="Chose start time"
                                    control={control}
                                    errorMessage={errors?.startTime?.message}
                                />
                                <DateTimePicker
                                    name="endTime"
                                    label="End Time"
                                    placeholder="Chose end time"
                                    control={control}
                                    errorMessage={errors?.endTime?.message}
                                />

                                <Input
                                    {...register("numberOfPeople", {
                                        valueAsNumber: true,
                                    })}
                                    name="numberOfPeople"
                                    label="Number of People"
                                    type="number"
                                    placeholder="Enter number of guests"
                                    errorMessage={
                                        errors.numberOfPeople?.message as any
                                    }
                                />
                            </div>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Select
                                    name="stayType"
                                    label="Stay Type"
                                    register={register}
                                    options={[
                                        { label: "Daily", value: "daily" },
                                        {
                                            label: "Hourly",
                                            value: "hourly",
                                        },
                                    ]}
                                />

                                <Select
                                    name="roomId"
                                    label="Room"
                                    register={register}
                                    errorMessage={errors?.roomId?.message}
                                    options={roomOpts}
                                />
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBooking;
