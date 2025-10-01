import { FaCheckCircle } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <FaCheckCircle className="w-20 h-20 text-green-500" />
                </div>

                {/* Content */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Payment Successful
                </h1>
                <p className="text-gray-600 mb-6">
                    Thank you! Your payment has been processed successfully.
                </p>

                {/* Actions */}
                <button
                    onClick={() => navigate("/bookings")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <CiHome className="w-5 h-5" />
                    Go to Bookings
                </button>
            </div>
        </div>
    );
}
