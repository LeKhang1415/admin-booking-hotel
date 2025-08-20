import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../../../components/Modal";
import useTypeRoom from "../hooks/useTypeRoom";
import useRoom from "../hooks/useRoom";
import { roomApi } from "../../../services/room.api";
import type { SelectOptsType } from "../../../types/utils.type";
import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { roomSchema, type RoomSchema } from "../../../utils/rule";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import InputFile from "../../../components/InputFile";
import Textarea from "../../../components/Textarea";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";

type FormData = RoomSchema;

function UpdateRoomContent({
    roomId,
    close,
}: {
    roomId: string;
    close?: () => void;
}) {
    const queryClient = useQueryClient();
    const { typeRoom } = useTypeRoom();
    const { room, isLoading } = useRoom(roomId);

    const { mutate, isPending } = useMutation({
        mutationFn: ({ body, id }: { body: any; id: string }) =>
            roomApi.updateRoom({ body, id }),
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
    });

    // Khi room thay đổi, reset form với dữ liệu room
    useEffect(() => {
        if (room) {
            reset({
                name: room.name,
                typeRoomId: room.typeRoom.id,
                pricePerDay: room.pricePerDay,
                pricePerHour: room.pricePerHour,
                interior: room.interior || "",
                facilities: room.facilities || "",
            });
        }
    }, [room, reset]);

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

        // ✅ Kiểm tra image có tồn tại và có file không
        if (data.image && data.image.length > 0) {
            submitData.append("image", data.image[0]);
        }

        mutate(
            { body: submitData, id: roomId },
            {
                onSuccess: () => {
                    toast.success("Cập nhật phòng thành công!");
                    queryClient.invalidateQueries({ queryKey: ["rooms"] });
                    queryClient.invalidateQueries({
                        queryKey: ["room", roomId],
                    });
                    reset();
                    close?.();
                },
                onError: (error) => {
                    const axiosError = error as AxiosError<{ message: string }>;
                    const errorMessage = axiosError.response?.data
                        ?.message as string;
                    toast.error(
                        errorMessage || "Có lỗi xảy ra. Vui lòng thử lại!"
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
            <Modal.Header>Cập Nhật Phòng</Modal.Header>

            <Modal.Body>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                >
                    {/* Row 1: Tên phòng và Loại phòng */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Tên phòng"
                            type="text"
                            placeholder="Nhập tên phòng"
                            name="name"
                            register={register}
                            errorMessage={errors?.name?.message}
                            required
                        />

                        <div>
                            <Select
                                name="typeRoomId"
                                label="Loại phòng"
                                register={register}
                                errorMessage={errors?.typeRoomId?.message}
                                options={typeRoomOpts}
                            />
                        </div>
                    </div>

                    {/* Row 2: Giá theo ngày và Giá theo giờ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Giá theo ngày (VNĐ)"
                            type="text"
                            placeholder="Nhập giá theo ngày"
                            name="pricePerDay"
                            register={register}
                            errorMessage={errors?.pricePerDay?.message}
                            required
                        />

                        <Input
                            label="Giá theo giờ (VNĐ)"
                            type="text"
                            placeholder="Nhập giá theo giờ"
                            name="pricePerHour"
                            register={register}
                            errorMessage={errors?.pricePerHour?.message}
                            required
                        />
                    </div>

                    {/* Row 3: Nội thất và Tiện nghi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Textarea
                                name="interior"
                                label="Nội thất"
                                placeholder="Mô tả nội thất trong phòng"
                                register={register}
                                errorMessage={errors?.interior?.message}
                            />
                        </div>

                        <div>
                            <Textarea
                                name="facilities"
                                label="Tiện nghi"
                                placeholder="Mô tả tiện nghi trong phòng"
                                register={register}
                                errorMessage={errors?.facilities?.message}
                            />
                        </div>
                    </div>

                    {/* Row 4: Upload ảnh phòng */}
                    <div>
                        <InputFile
                            name="image"
                            previewUrl={room?.image}
                            register={register}
                            label="Hình ảnh phòng (tùy chọn)"
                            errorMessage={errors?.image?.message}
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
                    Hủy
                </button>
                <Button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    isLoading={isPending}
                >
                    Cập nhật
                </Button>
            </Modal.Footer>
        </>
    );
}

export default UpdateRoomContent;
