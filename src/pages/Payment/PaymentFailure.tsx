import { FaTimesCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PaymentFailure() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <FaTimesCircle className="w-20 h-20 text-red-500" />
                </div>

                {/* Content */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Payment Failed
                </h1>
                <p className="text-gray-600 mb-6">
                    Oops! Something went wrong with your payment. Please try
                    again.
                </p>

                {/* Actions */}
                <div className="space-y-4">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                        Go back home
                    </button>
                </div>
            </div>
        </div>
    );
}
