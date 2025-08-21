import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";

import { type TypeRoomSchema, typeRoomSchema } from "../../../utils/rule";
import { typeRoomApi } from "../../../services/type-room.api";

type FormData = TypeRoomSchema;

function CreateTypeRoomContent({ close }: { close?: () => void }) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: typeRoomApi.createNewTypeRoom,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(typeRoomSchema),
    });

    const onSubmit = (data: FormData) => {
        const submitData = new FormData();
        submitData.append("name", data.name);
        submitData.append("introduction", data.introduction);
        submitData.append("highlight", data.highlight);
        submitData.append("sizeRoom", data.sizeRoom.toString());
        submitData.append("beds", data.beds);
        submitData.append("maxPeople", data.maxPeople.toString());

        mutate(submitData, {
            onSuccess: () => {
                toast.success("Type Room created successfully!");
                queryClient.invalidateQueries({ queryKey: ["typeRooms"] });
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
            <Modal.Header>Create New Type Room</Modal.Header>

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
                    Create Type Room
                </Button>
            </Modal.Footer>
        </>
    );
}

export default CreateTypeRoomContent;
