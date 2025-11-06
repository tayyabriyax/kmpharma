"use client"

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isLoggedIn = useSelector(state => state.kmpharma.auth.isLoggedIn);

    if (!isLoggedIn) {
        redirect("/login")
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main content area */}
            <div className="flex flex-col flex-1">
                {/* Navbar */}
                <Navbar setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-4">{children}</main>
            </div>
        </div>
    );
}
