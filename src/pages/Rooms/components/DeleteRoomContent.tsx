import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomApi } from "../../../services/room.api";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";

type DeleteRoomContentProps = {
    roomId: string;
    name: string;
    close?: () => void;
};

function DeleteRoomContent({ roomId, name, close }: DeleteRoomContentProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => roomApi.deleteRoom(roomId),
    });

    const handleDelete = () => {
        mutate(undefined, {
            onSuccess: () => {
                toast.success("Room deleted successfully!");
                queryClient.invalidateQueries({ queryKey: ["rooms"] });
                close?.();
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                const errorMessage = axiosError.response?.data
                    ?.message as string;
                toast.error(
                    errorMessage || "Failed to delete room. Please try again!"
                );
            },
        });
    };

    return (
        <>
            <Modal.Header>Delete Room</Modal.Header>

            <Modal.Body>
                <div className="p-4 md:p-5 text-center ">
                    <svg
                        className="mx-auto mb-4 text-red-500 w-12 h-12"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-red-500">
                        {`Are you sure you want to delete ${name}?`}
                    </h3>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    onClick={close}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    Cancel
                </button>
                <Button
                    type="button"
                    onClick={handleDelete}
                    isLoading={isPending}
                    variant="destructive"
                >
                    Delete Room
                </Button>
            </Modal.Footer>
        </>
    );
}

export default DeleteRoomContent;
