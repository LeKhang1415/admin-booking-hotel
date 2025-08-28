import type React from "react";

import { VscHome } from "react-icons/vsc";
import { RiBillLine } from "react-icons/ri";
import { PiUsersThreeThin } from "react-icons/pi";
import { MdBedroomChild } from "react-icons/md";
import { MdOutlineRateReview, MdOutlineRoomPreferences } from "react-icons/md";
import { LiaUserSolid } from "react-icons/lia";
import { BsBuildingCheck } from "react-icons/bs";
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/Rooms";
import Bookings from "../pages/Bookings";
import BookingDetail from "../pages/Bookings/BookingDetail";
import Reviews from "../pages/Reviews";
import Users from "../pages/Users";
import UserProfile from "../pages/UserProfile";

import TypeRoom from "../pages/TypeRoom";
import AvailableRooms from "../pages/Bookings/AvailableRooms";
import CreateBooking from "../pages/Bookings/CreateBooking";
import UpdateBooking from "../pages/Bookings/UpdateBooking";
import CheckinCheckout from "../pages/Checkin-Checkout";

type NavLink = {
    href: string;
    label: string;
    icon: React.ElementType;
};

type Routes = {
    path: string;
    element: React.ElementType;
};

export const links: NavLink[] = [
    {
        href: "/dashboard",
        label: "dashboard",
        icon: VscHome,
    },
    {
        href: "/rooms",
        label: "rooms",
        icon: MdBedroomChild,
    },
    {
        href: "/type-room",
        label: "type-room",
        icon: MdOutlineRoomPreferences,
    },
    {
        href: "/bookings",
        label: "bookings",
        icon: RiBillLine,
    },
    {
        href: "/checkin-checkout",
        label: "Check-in/Check-out",
        icon: BsBuildingCheck,
    },
    {
        href: "/users",
        label: "users",
        icon: PiUsersThreeThin,
    },
    {
        href: "/reviews",
        label: "reviews",
        icon: MdOutlineRateReview,
    },

    {
        href: "/profile",
        label: "profile",
        icon: LiaUserSolid,
    },
];

export const routes: Routes[] = [
    {
        path: "dashboard",
        element: Dashboard,
    },
    {
        path: "rooms",
        element: Rooms,
    },
    {
        path: "type-room",
        element: TypeRoom,
    },
    {
        path: "bookings",
        element: Bookings,
    },
    {
        path: "available-rooms",
        element: AvailableRooms,
    },
    {
        path: "create-booking",
        element: CreateBooking,
    },
    {
        path: "bookings/:id",
        element: BookingDetail,
    },
    {
        path: "bookings/update/:id",
        element: UpdateBooking,
    },
    {
        path: "/checkin-checkout",
        element: CheckinCheckout,
    },
    {
        path: "reviews",
        element: Reviews,
    },
    {
        path: "users",
        element: Users,
    },
    {
        path: "profile",
        element: UserProfile,
    },
];
