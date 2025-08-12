import type React from "react";

import { VscHome } from "react-icons/vsc";
import { RiBillLine } from "react-icons/ri";
import { PiUsersThreeThin } from "react-icons/pi";
import { MdBedroomChild } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { LiaUserSolid } from "react-icons/lia";
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/Rooms";
import Bookings from "../pages/Bookings";
import BookingDetail from "../pages/Bookings/BookingDetail";
import Reviews from "../pages/Reviews";
import Users from "../pages/Users";
import UserProfile from "../pages/UserProfile";

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
        href: "/bookings",
        label: "bookings",
        icon: RiBillLine,
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
        path: "bookings",
        element: Bookings,
    },
    {
        path: "bookings/:id",
        element: BookingDetail,
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
