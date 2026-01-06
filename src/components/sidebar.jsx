"use client";

import Link from "next/link";
import {
    BookOpen,
    Clipboard,
    ClipboardList,
    Handshake,
    LayoutDashboard,
    PawPrint,
    Truck,
    User,
    Users,
    X
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const pathname = usePathname();
    const user = useSelector(state => state.kmpharma.auth.loggedInUser);

    const sidebarRef = useRef(null);

    const menuItems = [
        { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { title: "Products", href: "/vaterinary-products", icon: <PawPrint size={20} /> },
        { title: "Orders", href: "/distributer-order", icon: <ClipboardList size={20} /> },
        // { title: "Reports", href: "/reports", icon: <Clipboard size={20} /> },
        { title: "Ledger", href: "/ledger", icon: <BookOpen size={20} /> },
    ];

    // Close sidebar on outside click (mobile only)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                sidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                window.innerWidth < 768
            ) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [sidebarOpen, setSidebarOpen]);

    const handleMobileClose = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-30 md:hidden" />
            )}

            <aside
                ref={sidebarRef}
                className={`fixed z-40 inset-y-0 left-0 w-64 bg-white text-black border-r border-gray-200
                transform transition-transform duration-200 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:static md:shadow-none`}
            >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">KM Pharma</h1>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav>
                    {user.role === "Admin" ? (
                        <>
                            <Link href="/user" onClick={handleMobileClose} className="flex items-center gap-3 px-3 py-3 hover:bg-teal-50">
                                <User size={20} /> Users
                            </Link>
                            <Link href="/distributors" onClick={handleMobileClose} className="flex items-center gap-3 px-3 py-3 hover:bg-teal-50">
                                <Handshake size={20} /> Team Members
                            </Link>
                            <Link href="/suppliers" onClick={handleMobileClose} className="flex items-center gap-3 px-3 py-3 hover:bg-teal-50">
                                <Truck size={20} /> Suppliers
                            </Link>
                            <Link href="/reports" onClick={handleMobileClose} className="flex items-center gap-3 px-3 py-3 hover:bg-teal-50">
                                <Clipboard size={20} /> Reports
                            </Link>
                        </>
                    ) : (
                        <Link href="/parties" onClick={handleMobileClose} className="flex items-center gap-3 px-3 py-3 hover:bg-teal-50">
                            <Users size={20} /> Parties
                        </Link>
                    )}
                    {menuItems.map(item => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={handleMobileClose}
                                className={`flex items-center gap-3 px-3 py-3 transition-all
                                ${isActive
                                        ? "border-r-4 border-teal-600 text-teal-600 bg-teal-50"
                                        : "text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
