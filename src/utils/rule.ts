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

export const updateRoomSchema = yup.object({
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
    interior: yup.string().required("Vui lòng nhập nội thất"),
    facilities: yup.string().required("Vui lòng nhập tiện nghi"),
    image: yup
        .mixed<FileList>()
        .optional() // ✅ Optional for updates
        .test("fileSize", "File quá lớn (tối đa 2MB)", (value) => {
            // ✅ Return true if no file selected (valid for update)
            if (!value || value.length === 0) return true;
            return value[0].size <= FILE_SIZE;
        })
        .test("fileType", "Chỉ chấp nhận file ảnh", (value) => {
            // ✅ Return true if no file selected (valid for update)
            if (!value || value.length === 0) return true;
            return value[0].type.startsWith("image/");
        }),
});

export const typeRoomSchema = yup.object({
    name: yup
        .string()
        .required("Vui lòng nhập tên loại phòng")
        .max(50, "Tên loại phòng không được vượt quá 50 ký tự"),

    introduction: yup.string().required("Vui lòng nhập phần giới thiệu"),

    highlight: yup.string().required("Vui lòng nhập điểm nổi bật"),

    sizeRoom: yup
        .number()
        .typeError("Diện tích phòng phải là số")
        .min(1, "Diện tích phải lớn hơn 0")
        .required("Vui lòng nhập diện tích phòng"),

    beds: yup.string().required("Vui lòng nhập thông tin giường ngủ"),

    maxPeople: yup
        .number()
        .typeError("Số người tối đa phải là số")
        .min(1, "Số người tối đa phải lớn hơn 0")
        .required("Vui lòng nhập số người tối đa"),
});

export const findAvailableRoomsSchema = yup.object({
    startTime: yup
        .date()
        .required("Start time is required")
        .min(new Date(), "Start time cannot be in the past"),
    endTime: yup
        .date()
        .required("End time is required")
        .min(yup.ref("startTime"), "End time must be after start time"),
    typeRoomId: yup.string().nullable().notRequired(),
    minPrice: yup
        .number()
        .nullable()
        .transform((value, originalValue) => {
            // Nếu là string rỗng hoặc undefined, return null
            if (originalValue === "" || originalValue === undefined) {
                return null;
            }
            // Parse thành number
            const parsed = parseFloat(originalValue);
            return isNaN(parsed) ? null : parsed;
        })
        .min(0, "Minimum price must be non-negative")
        .notRequired(),
    maxPrice: yup
        .number()
        .nullable()
        .transform((value, originalValue) => {
            if (originalValue === "" || originalValue === undefined) {
                return null;
            }
            const parsed = parseFloat(originalValue);
            return isNaN(parsed) ? null : parsed;
        })
        .min(
            yup.ref("minPrice"),
            "Maximum price must be greater than minimum price"
        )
        .notRequired(),
    priceType: yup.string().oneOf(["day", "hour"]).nullable().notRequired(),
    numberOfPeople: yup
        .number()
        .required("Number of people is required")
        .min(1, "Number of people must be at least 1"),
});

export type FindAvailableRoomsFormData = yup.InferType<
    typeof findAvailableRoomsSchema
>;

export type TypeRoomSchema = yup.InferType<typeof typeRoomSchema>;
export type UserSchema = yup.InferType<typeof userSchema>;
export type RoomSchema = yup.InferType<typeof roomSchema>;
export type UpdateRoomSchema = yup.InferType<typeof updateRoomSchema>;
