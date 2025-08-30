import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomApi } from "../../../services/room.api";
import type { SelectOptsType } from "../../../types/utils.type";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import type { AxiosError } from "axios";
import Modal from "../../../components/Modal";
import { type RoomSchema, roomSchema } from "../../../utils/rule";
import InputFile from "../../../components/InputFile";
import Textarea from "../../../components/Textarea";
import Select from "../../../components/Select";
import useAllTypeRooms from "../../TypeRoom/hooks/useAllTypeRooms";

type FormData = RoomSchema;

function CreateRoomContent({ close }: { close?: () => void }) {
    const queryClient = useQueryClient();
    const { typeRoom } = useAllTypeRooms();

    const { mutate, isPending } = useMutation({
        mutationFn: roomApi.createNewRoom,
    });

    const typeRoomOpts: SelectOptsType[] = useMemo(
        () =>
            typeRoom?.map((tr) => ({
                label: tr.name,
                value: tr.id,
            })) || [],
        [typeRoom]
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(roomSchema),
        defaultValues: {
            typeRoomId: typeRoomOpts[0]?.value,
        },
    });

    const onSubmit = (data: FormData) => {
        const submitData = new FormData();
        submitData.append("name", data.name);
        submitData.append("typeRoomId", data.typeRoomId);
        submitData.append("pricePerDay", data.pricePerDay.toString());
        submitData.append("pricePerHour", data.pricePerHour.toString());

        if (data.interior?.trim()) {
            submitData.append("interior", data.interior);
        }

        if (data.facilities?.trim()) {
            submitData.append("facilities", data.facilities);
        }

        submitData.append("image", (data.image as FileList)[0]);

        mutate(submitData, {
            onSuccess: () => {
                toast.success("Room created successfully!");
                queryClient.invalidateQueries({ queryKey: ["rooms"] });
                reset();
                close?.();
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                const errorMessage = axiosError.response?.data
                    ?.message as string;
                toast.error(
                    errorMessage || "An error occurred. Please try again!"
                );
            },
        });
    };

    const handleCancel = () => {
        reset();
        close?.();
    };

    return (
        <>
            <Modal.Header>Create New Room</Modal.Header>

            <Modal.Body>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                >
                    {/* Row 1: Room Name & Room Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Room Name"
                            type="text"
                            placeholder="Enter room name"
                            name="name"
                            register={register}
                            errorMessage={errors?.name?.message}
                            required
                        />

                        <div>
                            <Select
                                name="typeRoomId"
                                label="Room Type"
                                register={register}
                                errorMessage={errors?.typeRoomId?.message}
                                options={typeRoomOpts}
                            />
                        </div>
                    </div>

                    {/* Row 2: Price per Day & Price per Hour */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Price per Day (VND)"
                            type="text"
                            placeholder="Enter daily price"
                            defaultValue="0"
                            name="pricePerDay"
                            register={register}
                            errorMessage={errors?.pricePerDay?.message}
                            required
                        />

                        <Input
                            label="Price per Hour (VND)"
                            type="text"
                            defaultValue="0"
                            placeholder="Enter hourly price"
                            name="pricePerHour"
                            register={register}
                            errorMessage={errors?.pricePerHour?.message}
                            required
                        />
                    </div>

                    {/* Row 3: Interior & Facilities */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Textarea
                                name="interior"
                                label="Interior"
                                placeholder="Describe the room interior"
                                register={register}
                                errorMessage={errors?.interior?.message}
                            />
                        </div>

                        <div>
                            <Textarea
                                name="facilities"
                                label="Facilities"
                                placeholder="Describe the room facilities"
                                register={register}
                                errorMessage={errors?.facilities?.message}
                            />
                        </div>
                    </div>

                    {/* Row 4: Upload Room Image */}
                    <div>
                        <InputFile
                            name="image"
                            register={register}
                            label="Room Image"
                            multiple
                        />
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    isLoading={isPending}
                >
                    Create Room
                </Button>
            </Modal.Footer>
        </>
    );
}

export default CreateRoomContent;
