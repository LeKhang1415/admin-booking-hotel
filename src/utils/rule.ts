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
        .transform((_value, originalValue) => {
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
        .transform((_value, originalValue) => {
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

export const customerFormSchema = yup.object({
    bookingType: yup.string().oneOf(["online", "walk_in"]).required("Required"),
    customerFullName: yup.string().trim().required("Full name is required"),
    customerPhone: yup
        .string()
        .trim()
        .required("Phone number is required")
        .matches(/^[0-9+()\-\s]{6,20}$/, "Invalid phone number"),
    customerEmail: yup
        .string()
        .trim()
        .email("Invalid email")
        .nullable()
        .notRequired(),
    customerIdentityCard: yup.string().trim().nullable().notRequired(),
});

export const updateBookingSchema = yup.object({
    // không kiểm tra uuid ở đây (chỉ optional string)
    roomId: yup.string().nullable().notRequired(),

    // tên khách (optional, nếu có phải không rỗng)
    customerFullName: yup
        .string()
        .transform((v) => (typeof v === "string" ? v.trim() : v))
        .nullable()
        .notRequired()
        .test("not-empty", "Full name is required", (val) => {
            if (val == null) return true;
            return String(val).length > 0;
        }),

    // điện thoại (optional, nếu có phải đúng định dạng)
    customerPhone: yup
        .string()
        .transform((v) => (typeof v === "string" ? v.trim() : v))
        .nullable()
        .notRequired()
        .test("phone-format", "Số điện thoại không hợp lệ", (val) => {
            if (val == null) return true;
            return /^(0|\+84)([0-9]{9})$/.test(String(val));
        }),

    // email: nếu "" hoặc "-" -> null, nếu có thì validate email
    customerEmail: yup
        .string()
        .transform((v, orig) => {
            if (orig === "" || orig === "-") return null;
            return typeof v === "string" ? v.trim() : v;
        })
        .nullable()
        .notRequired()
        .email("Email không hợp lệ"),

    // CMND/CCCD: nếu "" hoặc "-" -> null, nếu có thì phải là 9-12 chữ số
    customerIdentityCard: yup
        .string()
        .transform((v, orig) => {
            if (orig === "" || orig === "-") return null;
            return typeof v === "string" ? v.trim() : v;
        })
        .nullable()
        .notRequired()
        .test("id-format", "CMND/CCCD phải có từ 9 đến 12 số", (val) => {
            if (val == null) return true;
            return /^[0-9]{9,12}$/.test(String(val));
        }),

    // số khách: optional nhưng nếu có phải >=1
    numberOfGuest: yup
        .number()
        .transform((_v, orig) => {
            if (orig === "" || orig === null || orig === undefined) return null;
            const parsed = Number(orig);
            return isNaN(parsed) ? undefined : parsed;
        })
        .nullable()
        .notRequired()
        .min(1, "Số lượng khách phải lớn hơn hoặc bằng 1"),

    // loại lưu trú: optional, nếu có chỉ 'daily' | 'hourly'
    stayType: yup
        .string()
        .nullable()
        .notRequired()
        .oneOf(["daily", "hourly"], "Loại lưu trú không hợp lệ"),

    // start / end: optional; nếu cả hai có thì end > start
    startTime: yup
        .date()
        .transform((_v, orig) => {
            if (orig === "" || orig === null || orig === undefined) return null;
            return new Date(orig);
        })
        .nullable()
        .notRequired()
        .typeError("Thời gian bắt đầu không hợp lệ"),

    endTime: yup
        .date()
        .transform((_v, orig) => {
            if (orig === "" || orig === null || orig === undefined) return null;
            return new Date(orig);
        })
        .nullable()
        .notRequired()
        .typeError("Thời gian kết thúc không hợp lệ")
        .test(
            "end-after-start",
            "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
            function (end) {
                const { startTime } = this.parent;
                if (!end || !startTime) return true;
                return new Date(end) > new Date(startTime);
            }
        ),
});

export type UpdateBookingSchema = yup.InferType<typeof updateBookingSchema>;

export type CustomerFormSchema = yup.InferType<typeof customerFormSchema>;

export type FindAvailableRoomsFormData = yup.InferType<
    typeof findAvailableRoomsSchema
>;

export type TypeRoomSchema = yup.InferType<typeof typeRoomSchema>;
export type UserSchema = yup.InferType<typeof userSchema>;
export type RoomSchema = yup.InferType<typeof roomSchema>;
export type UpdateRoomSchema = yup.InferType<typeof updateRoomSchema>;
