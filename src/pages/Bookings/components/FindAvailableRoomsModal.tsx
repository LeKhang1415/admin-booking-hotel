import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import DateTimePicker from "../../../components/DateTimePicker"; // bạn đã có sẵn
import { useMemo } from "react";
import type { SelectOptsType } from "../../../types/utils.type";
import {
    findAvailableRoomsSchema,
    type FindAvailableRoomsFormData,
} from "../../../utils/rule";
import useTypeRoom from "../../Rooms/hooks/useTypeRoom";
import { stringify } from "qs";
import { useNavigate } from "react-router-dom";

type FormData = FindAvailableRoomsFormData;

function FindAvailableRoomsModal({ close }: { close?: () => void }) {
    const { typeRoom } = useTypeRoom();
    const navigate = useNavigate();

    const typeRoomOpts: SelectOptsType[] = useMemo(
        () => [
            { label: "All", value: "" },
            ...(typeRoom?.map((tr) => ({
                label: tr.name,
                value: tr.id,
            })) || []),
        ],
        [typeRoom]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(
            findAvailableRoomsSchema
        ) as Resolver<FindAvailableRoomsFormData>,
        defaultValues: {
            priceType: "day",
        },
    });

    const onSubmit = (data: FormData) => {
        const query = stringify(
            {
                ...data,
                startTime: data.startTime
                    ? new Date(data.startTime).getTime()
                    : undefined,
                endTime: data.endTime
                    ? new Date(data.endTime).getTime()
                    : undefined,
            },
            { skipNulls: true }
        );

        navigate(`/available-rooms?${query}`);
        close?.();
    };

    const handleCancel = () => {
        reset();
        close?.();
    };

    return (
        <>
            <Modal.Header>Find Available Rooms</Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Row 1: Room Type & Number of People */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            name="typeRoomId"
                            label="Room Type"
                            register={register}
                            options={typeRoomOpts}
                            errorMessage={errors?.typeRoomId?.message}
                        />
                        <Input
                            name="numberOfPeople"
                            label="Number of People"
                            defaultValue={1}
                            type="text"
                            placeholder="Enter number of guests"
                            register={register}
                            errorMessage={errors?.numberOfPeople?.message}
                        />
                    </div>

                    {/* Row 2: Price Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            name="minPrice"
                            label="Min Price (VND)"
                            type="text"
                            placeholder="Enter min price"
                            register={register}
                            errorMessage={errors?.minPrice?.message}
                        />
                        <Input
                            name="maxPrice"
                            label="Max Price (VND)"
                            type="text"
                            placeholder="Enter max price"
                            register={register}
                            errorMessage={errors?.maxPrice?.message}
                        />
                    </div>

                    {/* Row 3: Start & End Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>

                    {/* Row 4: Price Type */}
                    <div>
                        <Select
                            name="priceType"
                            label="Price Type"
                            register={register}
                            options={[
                                { label: "Day", value: "day" },
                                { label: "Hour", value: "hour" },
                            ]}
                            errorMessage={errors?.priceType?.message}
                        />
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </button>
                <Button type="button" onClick={handleSubmit(onSubmit)}>
                    Search Rooms
                </Button>
            </Modal.Footer>
        </>
    );
}

export default FindAvailableRoomsModal;
