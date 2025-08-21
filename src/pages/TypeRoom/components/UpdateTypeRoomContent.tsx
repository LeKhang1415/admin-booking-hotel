import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";

import { type TypeRoomSchema, typeRoomSchema } from "../../../utils/rule";
import { typeRoomApi } from "../../../services/type-room.api";
import useTypeRoom from "../hooks/useTypeRoom";

type FormData = TypeRoomSchema;

function UpdateTypeRoomContent({
    typeRoomId,
    close,
}: {
    typeRoomId: string;
    close?: () => void;
}) {
    const queryClient = useQueryClient();
    const { typeRoom } = useTypeRoom(typeRoomId);

    const { mutate, isPending } = useMutation({
        mutationFn: ({ body, id }: { body: FormData | FormData; id: string }) =>
            typeRoomApi.updateTypeRoom({ body, id }),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(typeRoomSchema),
    });

    // fill dữ liệu từ API khi load
    useEffect(() => {
        if (typeRoom) {
            reset({
                name: typeRoom.name,
                introduction: typeRoom.introduction,
                highlight: typeRoom.highlight,
                sizeRoom: typeRoom.sizeRoom,
                beds: typeRoom.beds,
                maxPeople: typeRoom.maxPeople,
            });
        }
    }, [typeRoom, reset]);

    const onSubmit = (data: FormData) => {
        const submitData = {
            name: data.name,
            introduction: data.introduction,
            highlight: data.highlight,
            sizeRoom: data.sizeRoom,
            beds: data.beds,
            maxPeople: data.maxPeople,
        };

        mutate(
            { body: submitData, id: typeRoomId },
            {
                onSuccess: () => {
                    toast.success("Type Room updated successfully!");
                    queryClient.invalidateQueries({ queryKey: ["typeRooms"] });
                    queryClient.invalidateQueries({
                        queryKey: ["typeRoom", typeRoomId],
                    });
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
            }
        );
    };

    const handleCancel = () => {
        reset();
        close?.();
    };

    return (
        <>
            <Modal.Header>Update Type Room</Modal.Header>

            <Modal.Body>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                >
                    {/* Row 1: Name */}
                    <Input
                        label="Type Room Name"
                        type="text"
                        placeholder="Enter type room name"
                        name="name"
                        register={register}
                        errorMessage={errors?.name?.message}
                        required
                    />

                    {/* Row 2: Introduction & Highlight */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Textarea
                            name="introduction"
                            label="Introduction"
                            placeholder="Short description"
                            register={register}
                            errorMessage={errors?.introduction?.message}
                        />

                        <Textarea
                            name="highlight"
                            label="Highlight"
                            placeholder="Special features"
                            register={register}
                            errorMessage={errors?.highlight?.message}
                        />
                    </div>

                    {/* Row 3: SizeRoom, Beds, MaxPeople */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            label="Size Room (m²)"
                            type="text"
                            placeholder="Enter size"
                            name="sizeRoom"
                            register={register}
                            errorMessage={errors?.sizeRoom?.message}
                            required
                        />

                        <Input
                            label="Beds"
                            type="text"
                            placeholder="e.g. 1 giường king"
                            name="beds"
                            register={register}
                            errorMessage={errors?.beds?.message}
                            required
                        />

                        <Input
                            label="Max People"
                            type="text"
                            placeholder="Enter max people"
                            name="maxPeople"
                            register={register}
                            errorMessage={errors?.maxPeople?.message}
                            required
                        />
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                    disabled={isPending}
                >
                    Cancel
                </button>
                <Button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    isLoading={isPending}
                >
                    Update Type Room
                </Button>
            </Modal.Footer>
        </>
    );
}

export default UpdateTypeRoomContent;
