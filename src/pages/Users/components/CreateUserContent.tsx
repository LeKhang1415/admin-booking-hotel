import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { userApi } from "../../../services/user.api";
import { userSchema } from "../../../utils/rule";
import { UserRole, type CreateUserDto } from "../../../types/user.type";
import Select from "../../../components/Select";

type FormData = CreateUserDto;

function CreateUserContent({ close }: { close?: () => void }) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: userApi.createUser,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(userSchema),
    });

    const onSubmit = (data: FormData) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("User created successfully!");
                queryClient.invalidateQueries({ queryKey: ["users"] });
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

    const roleOptions = [
        { value: UserRole.STAFF, label: "Staff" },
        { value: UserRole.CUSTOMER, label: "Customer" },
    ];

    return (
        <>
            <Modal.Header>Create New User</Modal.Header>

            <Modal.Body>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                >
                    {/* Name */}
                    <Input
                        label="Full Name"
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
                        placeholder="Enter password"
                        name="password"
                        register={register}
                        errorMessage={errors?.password?.message}
                        required
                    />

                    {/* Role */}
                    <Select
                        label="Role"
                        name="role"
                        placeholder="Select role"
                        register={register}
                        errorMessage={errors?.role?.message}
                        rules={{ required: "Role is required" }}
                        options={roleOptions}
                    />
                </form>
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    Cancel
                </button>
                <Button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    isLoading={isPending}
                >
                    Create User
                </Button>
            </Modal.Footer>
        </>
    );
}

export default CreateUserContent;
