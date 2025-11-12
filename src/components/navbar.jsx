"use client"

import { REMOVE_ACTIVE_USER } from "@/lib/slices/authSlice";
import { Menu, Bell, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Navbar({ setSidebarOpen }) {
    const dispatch = useDispatch();

    const pathname = usePathname();

    function activeTab() {
        if (pathname.includes('/dashboard')) return 'Dashboard'
        if (pathname.includes('/distributers')) return 'Distributers'
        if (pathname.includes('/suppliers')) return 'Suppliers'
    }

    return (
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
            <div className="flex items-center gap-2">
                <button
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
                <h2 className="text-lg font-semibold text-gray-800">{activeTab()}</h2>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative">
                    <Bell className="w-6 h-6 text-gray-700" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <button onClick={() => dispatch(REMOVE_ACTIVE_USER())} className="flex items-center gap-1 text-gray-700 hover:bg-red-300 py-2 px-4 hover:text-red-600 cursor-pointer rounded-lg">
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                </button>

            </div>
        </header>
    )
}