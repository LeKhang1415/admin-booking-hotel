import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import useBooking from "./hooks/useBooking";
import DateTimePicker from "../../components/DateTimePicker";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { capitalizeFirst, formatCurrency, formatDate } from "../../utils/utils";
import useAllRooms from "../Rooms/hooks/useAllRooms";
import type { SelectOptsType } from "../../types/utils.type";
import usePreviewBooking from "./hooks/usePreviewBooking";
import {
    BookingStatus,
    StayType,
    type UpdateBookingDto,
} from "../../types/booking.types";
import useUpdateBooking from "./hooks/useUpdateBooking";
import Button from "../../components/Button";
import { updateBookingSchema } from "../../utils/rule";
import { yupResolver } from "@hookform/resolvers/yup";
import useDebounce from "../../hooks/useDebounce";
import Modal from "../../components/Modal";
import RejectContent from "./components/RejectContent";
import MarkAsPaidContent from "./components/MarkAsPaidContent";
import toast from "react-hot-toast";

interface BookingFormData {
    roomId: string;
    customerFullName: string;
    customerPhone: string;
    customerEmail?: string;
    customerIdentityCard?: string;
    numberOfGuest: number;
    startTime: Date;
    stayType: StayType;
    endTime: Date;
}

const statusColor: Record<BookingStatus, string> = {
    [BookingStatus.UNPAID]: "bg-danger text-on-danger",
    [BookingStatus.PAID]: "bg-success text-on-success",
    [BookingStatus.CHECKED_IN]: "bg-accent text-on-accent",
    [BookingStatus.COMPLETED]: "bg-warm text-on-warm",
    [BookingStatus.CANCELLED]: "bg-gray-300 text-gray-600",
    [BookingStatus.REJECTED]: "bg-gray-500 text-gray-100",
};

function UpdateBooking() {
    const { id } = useParams<{ id: string }>();
    const { booking, isLoading } = useBooking(id);
    const { rooms } = useAllRooms();
    const navigate = useNavigate();

    const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking(
        id!,
        {
            onSuccess: () => {
                navigate("/bookings");
            },
        }
    );

    const roomOpts: SelectOptsType[] = useMemo(
        () =>
            rooms?.map((r) => ({
                label: r.name,
                value: r.id,
            })) || [],
        [rooms]
    );

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm<BookingFormData>({
        resolver: yupResolver(updateBookingSchema) as any,
        mode: "onChange",
        defaultValues: {
            customerFullName: "",
            customerPhone: "",
            customerEmail: "",
            customerIdentityCard: "",
            numberOfGuest: 1,
            startTime: new Date(),
            endTime: new Date(),
            stayType: "daily",
        },
    });

    // Watch các field thuộc Stay information để trigger preview hook
    const roomId = useWatch({ control, name: "roomId" });
    const startTime = useWatch({ control, name: "startTime" });
    const endTime = useWatch({ control, name: "endTime" });
    const stayType = useWatch({ control, name: "stayType" });
    const numberOfGuest = useWatch({ control, name: "numberOfGuest" }) as
        | number
        | undefined;

    const debouncedNumberOfGuest = useDebounce(numberOfGuest, 400);

    // Tạo payload cho preview booking
    const previewPayload = useMemo(() => {
        if (!roomId || !startTime || !endTime || !stayType) return null;

        return {
            bookingId: booking?.bookingId,
            roomId,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            stayType,
            numberOfGuest: debouncedNumberOfGuest ?? 1,
        };
    }, [
        booking?.bookingId,
        roomId,
        startTime,
        endTime,
        stayType,
        debouncedNumberOfGuest,
    ]);

    // Gọi preview booking khi có thay đổi
    const {
        preview,
        isLoading: isPreviewLoading,
        error: previewError,
        isError: isPreviewError,
    } = usePreviewBooking(previewPayload!, true);

    // Khi booking về, reset form với dữ liệu thực tế
    useEffect(() => {
        if (!booking) return;

        if (
            booking.bookingStatus === BookingStatus.PAID ||
            booking.bookingStatus === BookingStatus.REJECTED
        ) {
            toast.error("This booking cannot be edited anymore.");
            navigate("/bookings");
            return;
        }

        reset({
            customerFullName: booking.customer.fullName ?? "",
            customerPhone: booking.customer.phone ?? "",
            customerEmail: booking.customer.email ?? "",
            customerIdentityCard: booking.customer.identityCard ?? "",
            roomId: booking.room.id,
            numberOfGuest: booking.numberOfGuest ?? 1,
            startTime: booking.startTime
                ? new Date(booking.startTime)
                : new Date(),
            endTime: booking.endTime ? new Date(booking.endTime) : new Date(),
            stayType: booking.stayType ?? "daily",
        });
    }, [booking, navigate, reset]);

    // Nếu đang loading hoặc không tìm thấy
    if (isLoading) return <div>Loading...</div>;
    if (!booking) return <div>Không tìm thấy booking</div>;

    const displayNumOfGuest = preview?.numberOfGuest || booking.numberOfGuest;
    const displayRoom = preview?.room || booking.room;
    const displayStayType = preview?.stayType || booking.stayType;
    const displayTotal = preview?.totalAmount || booking.totalAmount;
    const displayStartTime = preview?.startTime || booking.startTime;
    const displayEndTime = preview?.endTime || booking.endTime;

    const isDaily = displayStayType === StayType.DAILY;
    const price = isDaily ? displayRoom.pricePerDay : displayRoom.pricePerHour;
    const unit = isDaily ? "ngày" : "giờ";

    const onSubmit = (data: BookingFormData) => {
        // Chuyển đổi dữ liệu form thành format UpdateBookingDto
        const updatePayload: UpdateBookingDto = {
            roomId: data.roomId,
            customerFullName: data.customerFullName,
            customerPhone: data.customerPhone,
            customerEmail: data.customerEmail || undefined,
            customerIdentityCard: data.customerIdentityCard || undefined,
            numberOfGuest: Number(data.numberOfGuest),
            startTime: data.startTime.toISOString(),
            endTime: data.endTime.toISOString(),
            stayType: data.stayType,
        };

        updateBooking(updatePayload);
    };

    const handleConfirmUpdate = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center max-w-6xl bg-card-bg p-6 rounded-xl shadow shadow-card w-full mx-auto mb-5">
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
            <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                        noValidate
                    >
                        <section className="bg-card-bg rounded-lg shadow p-5">
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
                                    value={booking.customer.email || "-"}
                                    errorMessage={
                                        errors.customerEmail?.message as any
                                    }
                                />

                                <Input
                                    {...register("customerIdentityCard")}
                                    name="customerIdentityCard"
                                    label="Identity card"
                                    placeholder="Enter identity card"
                                    value={booking.customer.identityCard || "-"}
                                    errorMessage={
                                        errors.customerIdentityCard
                                            ?.message as any
                                    }
                                />
                            </div>
                        </section>

                        <section className="bg-card-bg rounded-lg shadow p-5">
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
                                    {...register("numberOfGuest", {
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: "Số khách ít nhất là 1",
                                        },
                                    })}
                                    name="numberOfGuest"
                                    label="Number of Guest"
                                    type="number"
                                    placeholder="Enter number of guests"
                                    errorMessage={
                                        errors.numberOfGuest?.message as any
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

                {/* Right column (price summary) */}
                <aside className="space-y-5">
                    <div className="bg-card-bg rounded-lg shadow p-5">
                        <h3 className="text-lg font-semibold mb-3">
                            Price summary
                            {isPreviewLoading && (
                                <span className="ml-2 text-sm text-gray-500">
                                    (Updating...)
                                </span>
                            )}
                        </h3>

                        {previewError && (
                            <div className="mb-3 p-3 rounded-md bg-red-50 text-red-600 text-sm">
                                {previewError.response?.data?.message ||
                                    previewError.message ||
                                    "Có lỗi xảy ra khi tính giá"}
                            </div>
                        )}

                        {!previewError && (
                            <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <span>Room ({displayRoom.name})</span>
                                    <span>{`${formatCurrency(
                                        price
                                    )} / ${unit}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Number of Guest</span>
                                    <span>{displayNumOfGuest}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Stay type</span>
                                    <span>
                                        {capitalizeFirst(displayStayType)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Check in</span>
                                    <span>
                                        {formatDate(displayStartTime, true)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Check out</span>
                                    <span>
                                        {formatDate(displayEndTime, true)}
                                    </span>
                                </div>
                                <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>
                                        {`${formatCurrency(displayTotal)}`}
                                    </span>
                                </div>
                            </div>
                        )}

                        <Button
                            className="mt-4 w-full py-2 rounded-md bg-green-600 hover:bg-green-400"
                            isLoading={isUpdating || isPreviewLoading}
                            onClick={handleConfirmUpdate}
                            disabled={
                                !isValid ||
                                isSubmitting ||
                                isUpdating ||
                                isPreviewLoading ||
                                isPreviewError
                            }
                        >
                            Confirm update
                        </Button>
                    </div>
                    <div className="bg-card-bg rounded-lg shadow py-4 px-5">
                        <h4 className="text-md font-semibold mb-2">
                            Quick actions
                        </h4>
                        <div className="flex flex-col gap-2">
                            <Modal>
                                <Modal.Open
                                    opens={`mark-as-paid-${booking.bookingId}`}
                                >
                                    <Button
                                        className="py-2 bg-transparent font-semibold border border-black text-black hover:bg-gray-200"
                                        disabled={
                                            !isValid ||
                                            isSubmitting ||
                                            isUpdating ||
                                            isPreviewLoading ||
                                            isPreviewError
                                        }
                                    >
                                        Mark as paid
                                    </Button>
                                </Modal.Open>

                                <Modal.Open
                                    opens={`reject-booking-${booking.bookingId}`}
                                >
                                    <Button
                                        className="py-2 border bg-transparent text-red-600  hover:bg-red-200"
                                        disabled={
                                            !isValid ||
                                            isSubmitting ||
                                            isUpdating ||
                                            isPreviewLoading ||
                                            isPreviewError
                                        }
                                    >
                                        Reject booking
                                    </Button>
                                </Modal.Open>

                                <Modal.Content
                                    name={`mark-as-paid-${booking.bookingId}`}
                                >
                                    <MarkAsPaidContent
                                        bookingId={booking.bookingId}
                                    />
                                </Modal.Content>

                                <Modal.Content
                                    name={`reject-booking-${booking.bookingId}`}
                                >
                                    <RejectContent
                                        bookingId={booking.bookingId}
                                    />
                                </Modal.Content>
                            </Modal>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default UpdateBooking;
