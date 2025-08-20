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

// Validation schema
export const roomSchema = yup.object({
    name: yup.string().required("Vui lòng nhập tên phòng"),
    typeRoomId: yup.string().required("Vui lòng chọn loại phòng"),
    pricePerDay: yup
        .number()
        .typeError("Giá theo ngày phải là số")
        .min(1, "Giá theo ngày phải lớn hơn 0")
        .required("Vui lòng nhập giá theo ngày"),
    pricePerHour: yup
        .number()
        .typeError("Giá theo giờ phải là số")
        .min(1, "Giá theo giờ phải lớn hơn 0")
        .required("Vui lòng nhập giá theo giờ"),
    interior: yup.string().required(),
    facilities: yup.string().required(),
    image: yup
        .mixed<FileList>()
        .required("Vui lòng chọn hình ảnh phòng")
        .test("fileSize", "File quá lớn (tối đa 2MB)", (value) => {
            if (!value || value.length === 0) return false;
            return value[0].size <= FILE_SIZE;
        })
        .test("fileType", "Chỉ chấp nhận file ảnh", (value) => {
            if (!value || value.length === 0) return false;
            return value[0].type.startsWith("image/");
        }),
});

export type UserSchema = yup.InferType<typeof userSchema>;
export type RoomSchema = yup.InferType<typeof roomSchema>;
