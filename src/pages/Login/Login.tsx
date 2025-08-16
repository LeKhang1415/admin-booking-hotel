import { useNavigate } from "react-router-dom";
import { type UserSchema, userSchema } from "../../utils/rule";
import { useAppDispatch } from "../../hooks/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { authApi } from "../../services/auth.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { setAccessToken, setUser } from "../../store/slices/authSlice";
import type { AxiosError } from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";

type FormData = Pick<UserSchema, "email" | "password">;
const loginSchema = userSchema.pick(["email", "password"]);

function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(loginSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: authApi.login,
    });

    function onSubmit(data: FormData) {
        mutate(data, {
            onSuccess: (response) => {
                const user = response.data?.user;
                const token = response.data?.accessToken;

                if (user.role?.name === "Customer")
                    return toast.error(
                        `You don't have permission to access this route`
                    );

                dispatch(setAccessToken(token));
                dispatch(setUser(user));
                navigate("/");
                toast.success("Login successfully");
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                const errorMessage = axiosError.response?.data
                    ?.message as string;
                toast.error(
                    errorMessage ||
                        "Something went wrong. Please try again later!"
                );
            },
        });
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-[#202020] px-10 py-12 rounded-2xl">
            <h2 className="text-lg text-white text-center font-bold">Login</h2>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Input
                    label="Email"
                    type="email"
                    placeholder="Your email"
                    name="email"
                    register={register}
                    defaultValue="chaoskid1415@gmail.com"
                    errorMessage={errors?.email?.message}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Your password"
                    name="password"
                    defaultValue="khang1st"
                    register={register}
                    errorMessage={errors?.password?.message}
                />
                <Button type="submit" isLoading={isPending}>
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;
