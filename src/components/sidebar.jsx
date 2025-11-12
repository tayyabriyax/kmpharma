"use client"

import Link from "next/link";
import { Handshake, LayoutDashboard, Truck, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const pathname = usePathname();

    const menuItems = [
        { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { title: "Distributers", href: "/distributers", icon: <Handshake size={20} /> },
        { title: "Suppliers", href: "/suppliers", icon: <Truck size={20} /> },
    ];

    return (
        <aside
            className={`fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-lg transform text-black border-r border-gray-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-200 ease-in-out
          md:translate-x-0 md:static md:shadow-none`}
        >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-xl font-semibold">KM Pharma</h1>
                <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                    <X size={20} />
                </button>
            </div>

            <nav>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
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
    )
}