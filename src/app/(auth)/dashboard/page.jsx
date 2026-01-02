"use client";

import Link from "next/link";
import {
    Clipboard,
    ClipboardList,
    Handshake,
    KeyRound,
    LogOut,
    PawPrint,
    Truck,
    User,
    Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ACTIVE_USER } from "@/lib/slices/authSlice";

export default function Dashboard() {
    const user = useSelector((state) => state.kmpharma.auth.loggedInUser);
    const dispatch = useDispatch();

    /* ---------- Common Menus ---------- */
    const commonMenus = [
        {
            title: "Products",
            href: "/vaterinary-products",
            icon: PawPrint,
        },
        {
            title: "Orders",
            href: "/distributer-order",
            icon: ClipboardList,
        },
        {
            title: "Reports",
            href: "/reports",
            icon: Clipboard,
        },
    ];

    /* ---------- Admin Menus ---------- */
    const adminMenus = [
        {
            title: "Users",
            href: "/user",
            icon: User,
        },
        {
            title: "Team Members",
            href: "/distributors",
            icon: Handshake,
        },
        {
            title: "Suppliers",
            href: "/suppliers",
            icon: Truck,
        },
    ];

    /* ---------- User Menus ---------- */
    const userMenus = [
        {
            title: "Parties",
            href: "/parties",
            icon: Users,
        },
    ];

    /* ---------- Profile Menus ---------- */
    const profileMenus = [
        {
            title: "Edit Profile",
            href: "/profile",
            icon: User,
        },
        {
            title: "Change Password",
            href: "/change-password",
            icon: KeyRound,
        },
    ];

    const menus =
        user?.role === "Admin"
            ? [...commonMenus, ...adminMenus, ...profileMenus]
            : [...commonMenus, ...userMenus, ...profileMenus];

    return (
        <div className="space-y-4">
            {/* Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {menus.map((item) => (
                    <DashboardCard key={item.title} item={item} />
                ))}
                <button
                    onClick={() => dispatch(REMOVE_ACTIVE_USER())}
                    className="group bg-white border border-gray-200 rounded-xl p-6
                 hover:border-red-600 hover:shadow-md transition-all"
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div
                            className="p-4 rounded-full bg-red-50 text-red-600
                     group-hover:bg-red-600 group-hover:text-white transition"
                        >
                            <LogOut size={28} />
                        </div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            Logout
                        </h2>

                        <p className="text-sm text-gray-500">
                            Logout current section
                        </p>
                    </div>
                </button>
            </div>
        </div>
    );
}

/* ---------- Card Component ---------- */
function DashboardCard({ item }) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            className="group bg-white border border-gray-200 rounded-xl p-6
                 hover:border-teal-600 hover:shadow-md transition-all"
        >
            <div className="flex flex-col items-center text-center gap-4">
                <div
                    className="p-4 rounded-full bg-teal-50 text-teal-600
                     group-hover:bg-teal-600 group-hover:text-white transition"
                >
                    <Icon size={28} />
                </div>

                <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                </h2>

                <p className="text-sm text-gray-500">
                    Manage {item.title.toLowerCase()}
                </p>
            </div>
        </Link>
    );
}
