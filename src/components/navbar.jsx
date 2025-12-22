"use client"

import { REMOVE_ACTIVE_USER } from "@/lib/slices/authSlice";
import { Menu, Bell, LogOut, User, KeyRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { getUserDetails } from "@/lib/slices/userSlice";

export default function Navbar({ setSidebarOpen }) {
    const dispatch = useDispatch();
    const pathname = usePathname();

    const user = useSelector((state) => state.kmpharma?.user?.userDetails);
    const loadData = useSelector((state) => state.kmpharma?.user?.loadData);

    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        dispatch(getUserDetails());
    }, [loadData])

    function activeTab() {
        if (pathname.includes('/dashboard')) return 'Dashboard'
        if (pathname.includes('/distributors')) return 'Distributors'
        if (pathname.includes('/suppliers')) return 'Suppliers'
        if (pathname.includes('/parties')) return 'Parties'
        if (pathname.includes('/veterinary-products')) return 'Products'
        // if (pathname.includes('/distributer-products')) return 'Distributer Products'
        if (pathname.includes('/distributer-order')) return 'Orders'
        if (pathname.includes('/user')) return 'User'
        if (pathname.includes('/profile')) return 'Profile'
        if (pathname.includes('/change-password')) return 'Change Password'
    }

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const userInitials = user?.username
        ? user.username.split(" ").map(n => n[0]).join("").toUpperCase()
        : "U";

    return (
        <header className="flex items-center justify-between border-b border-gray-300 z-50 shadow-sm bg-white px-4 py-2.5">
            <div className="flex items-center gap-2">
                <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
                <h2 className="text-lg font-semibold text-gray-800">{activeTab()}</h2>
            </div>

            <div className="flex items-center gap-4">

                {/* NOTIFICATION */}
                {/* <button className="relative">
                    <Bell className="w-6 h-6 text-gray-700" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button> */}

                {/* EXISTING LOGOUT BUTTON */}
                {/* <button
                    onClick={() => dispatch(REMOVE_ACTIVE_USER())}
                    className="flex items-center gap-1 text-gray-700 hover:bg-red-300 py-2 px-4 hover:text-red-600 cursor-pointer rounded-lg"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                </button> */}

                {/* USER DETAILS DROPDOWN */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className="flex cursor-pointer items-center gap-2 px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                            {userInitials}
                        </div>

                        <div className="hidden sm:flex flex-col text-left leading-tight">
                            <span className="text-gray-800 text-sm font-medium">{user?.fullname || "User"}</span>
                            <span className="text-gray-500 text-xs">{user?.email || "email@example.com"}</span>
                        </div>
                    </button>

                    {/* DROPDOWN MENU */}
                    {openDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-50 animate-fadeIn">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                            >
                                <User size={18} />
                                Edit Profile
                            </Link>

                            <Link
                                href="/change-password"
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                            >
                                <KeyRound size={18} />
                                Change Password
                            </Link>

                            <button
                                onClick={() => dispatch(REMOVE_ACTIVE_USER())}
                                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-red-100 text-red-600"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}
