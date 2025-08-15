import * as yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const userSchema = yup.object().shape({
    name: yup.string().required("Trường này là bắt buộc"),
    email: yup
        .string()
        .required("Trường này là bắt buộc")
        .email("Vui lòng nhập email hợp lệ"),
    password: yup
        .string()
        .required("Trường này là bắt buộc")
        .min(8, "Mật khẩu cần ít nhất 8 ký tự"),
    role: yup.string(),
});

export type UserSchema = yup.InferType<typeof userSchema>;
