"use client";

import Link from "next/link";
import {
    Clipboard,
    ClipboardList,
    Handshake,
    PawPrint,
    Truck,
    User,
    Users,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const user = useSelector((state) => state.kmpharma.auth.loggedInUser);

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
            title: "Distributors",
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

    const menus =
        user?.role === "Admin"
            ? [...commonMenus, ...adminMenus]
            : [...commonMenus, ...userMenus];

    return (
        <div className="space-y-4">
            {/* Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {menus.map((item) => (
                    <DashboardCard key={item.title} item={item} />
                ))}
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
