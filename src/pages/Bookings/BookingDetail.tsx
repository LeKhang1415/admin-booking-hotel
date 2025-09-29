import { useNavigate, useParams } from "react-router-dom";
import useBooking from "./hooks/useBooking";
import Spinner from "../../components/Spinner";
import Main from "../../components/Main";
import { FaArrowLeft } from "react-icons/fa";
import StatusBanner from "./components/StatusBanner";
import BookingDetailPanel from "./components/BookingDetailPanel";
import BookingInfo from "./components/BookingInfo";
import UserItem from "../../components/UserItem";
import PaymentDetail from "./components/PaymentDetail";
import BookingHistory from "./components/BookingHistory";

function BookingDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { booking, isLoading } = useBooking(id);

    if (isLoading) return <Spinner center />;

    return (
        <Main>
            {booking && (
                <div className=" max-w-7xl flex-1 h-full overflow-auto">
                    {/* Header */}
                    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-6">
                        <div className="max-w-7xl flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-accent hover:opacity-80"
                            >
                                <FaArrowLeft />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Booking detail #{booking.bookingId}
                            </h1>
                        </div>
                    </header>

                    {/* Status */}
                    <div className="bg-white shadow-md max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <StatusBanner
                            status={booking.bookingStatus}
                            updatedAt={booking.updateDate}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main content */}
                            <div className="lg:col-span-2 space-y-8 bg-white">
                                <BookingDetailPanel title="Booking info">
                                    <BookingInfo booking={booking} />
                                </BookingDetailPanel>

                                <BookingDetailPanel
                                    title={
                                        booking.user
                                            ? "Customer info"
                                            : "Create by"
                                    }
                                >
                                    <UserItem
                                        lineClamp={false}
                                        email={booking?.createdBy.email}
                                        name={booking?.createdBy.name}
                                    />
                                </BookingDetailPanel>

                                <BookingDetailPanel title="Payment detail">
                                    <PaymentDetail
                                        payments={booking.payments}
                                    />
                                </BookingDetailPanel>
                            </div>
                            <div className="space-y-6">
                                {/* Quick Actions */}
                                <BookingDetailPanel title="Quick actions">
                                    <div className="space-y-3">
                                        <button className="w-full bg-orange-400 hover:opacity-90 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                                            <i className="fas fa-file-pdf mr-2" />
                                            Export PDF
                                        </button>
                                    </div>
                                </BookingDetailPanel>

                                <BookingDetailPanel title="Booking History">
                                    <BookingHistory
                                        createdAt={booking.createdDate}
                                        updatedAt={booking.updateDate}
                                    />
                                </BookingDetailPanel>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Main>
    );
}

export default BookingDetail;
