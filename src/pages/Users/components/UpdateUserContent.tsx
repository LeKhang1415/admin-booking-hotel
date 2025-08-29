import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";

import { updateUserSchema } from "../../../utils/rule";
import { userApi } from "../../../services/user.api";
import useUser from "../hooks/useUser";
import { UserRole, type UpdateUserDto } from "../../../types/user.type";

type FormData = UpdateUserDto;

function UpdateUserContent({
    userId,
    close,
}: {
    userId: string;
    close?: () => void;
}) {
    const queryClient = useQueryClient();
    const { user } = useUser(userId);

    const { mutate, isPending } = useMutation({
        mutationFn: ({ body, id }: { body: FormData; id: string }) =>
            userApi.updateUser({ body, id }),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(updateUserSchema) as any,
    });

    // fill dữ liệu từ API khi load
    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                password: "", // không fill mật khẩu cũ
                role: user.role,
            });
        }
    }, [user, reset]);

    const onSubmit = (data: FormData) => {
        const submitData = {
            name: data.name,
            email: data.email,
            password: data.password || undefined, // optional
            role: data.role,
        };

        mutate(
            { body: submitData, id: userId },
            {
                onSuccess: () => {
                    toast.success("User updated successfully!");
                    queryClient.invalidateQueries({ queryKey: ["users"] });
                    queryClient.invalidateQueries({
                        queryKey: ["user", userId],
                    });
                    reset();
                    close?.();
                },
                onError: (error) => {
                    const axiosError = error as AxiosError<{ message: string }>;
                    const errorMessage = axiosError.response?.data?.message;
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

    const roleOptions = [
        { value: UserRole.STAFF, label: "Staff" },
        { value: UserRole.CUSTOMER, label: "Customer" },
    ];

    console.log(user);
    return (
        <>
            <Modal.Header>Update User</Modal.Header>

            <Modal.Body>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                >
                    {/* Name */}
                    <Input
                        label="Name"
                        type="text"
                        placeholder="Enter full name"
                        name="name"
                        register={register}
                        errorMessage={errors?.name?.message}
                        required
                    />

                    {/* Email */}
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        register={register}
                        errorMessage={errors?.email?.message}
                        required
                    />

                    {/* Password */}
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Leave blank to keep current password"
                        name="password"
                        register={register}
                        errorMessage={errors?.password?.message}
                    />

                    {/* Role */}
                    <Select
                        label="Role"
                        name="role"
                        register={register}
                        errorMessage={errors?.role?.message}
                        options={roleOptions}
                    />
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
                    Update User
                </Button>
            </Modal.Footer>
        </>
    );
}

export default UpdateUserContent;
