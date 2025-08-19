import { useMutation, useQueryClient } from "@tanstack/react-query";
import useTypeRoom from "../hooks/useTypeRoom";
import { roomApi } from "../../../services/room.api";
import type { SelectOptsType } from "../../../types/utils.type";
import { useMemo, useState } from "react";
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

type FormData = RoomSchema;

function CreateRoomContent({ close }: { close: () => void }) {
    const queryClient = useQueryClient();
    const { typeRoom } = useTypeRoom();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

        // Debug log để kiểm tra dữ liệu gửi đi
        console.log("Submitting form data:");
        for (const [key, value] of submitData.entries()) {
            console.log(`${key}:`, value);
        }

        mutate(submitData, {
            onSuccess: () => {
                toast.success("Tạo phòng thành công!");
                queryClient.invalidateQueries({ queryKey: ["rooms"] });
                reset();
                setSelectedFile(null);
                close();
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                const errorMessage = axiosError.response?.data
                    ?.message as string;
                toast.error(errorMessage || "Có lỗi xảy ra. Vui lòng thử lại!");
            },
        });
    };

    const handleCancel = () => {
        reset();
        setSelectedFile(null);
        close();
    };

    return (
        <>
            <Modal.Header>Tạo Phòng Mới</Modal.Header>

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
                            defaultValue="0"
                            name="pricePerDay"
                            register={register}
                            errorMessage={errors?.pricePerDay?.message}
                            required
                        />

                        <Input
                            label="Giá theo giờ (VNĐ)"
                            type="text"
                            defaultValue="0"
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
                                placeholder="Mô tả nội thất trong phòng"
                                register={register}
                                errorMessage={errors?.facilities?.message}
                            />
                        </div>
                    </div>

                    {/* Row 4: Upload hình ảnh */}
                    <div>
                        <InputFile
                            name="image"
                            register={register}
                            label="Hình ảnh phòng"
                            multiple
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
                    Tạo phòng
                </Button>
            </Modal.Footer>
        </>
    );
}

export default CreateRoomContent;
