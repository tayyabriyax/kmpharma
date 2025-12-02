"use client"

import Link from "next/link";
import { ClipboardList, Handshake, LayoutDashboard, PackageSearch, PawPrint, Truck, User, Users, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const pathname = usePathname();

    const user = useSelector(state => state.kmpharma.auth.loggedInUser);

    const menuItems = [
        { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { title: "Products", href: "/vaterinary-products", icon: <PawPrint size={20} /> },
        { title: "Orders", href: "/distributer-order", icon: <ClipboardList size={20} /> },
    ];

    // Close sidebar only on mobile
    const handleMobileClose = () => {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

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

                {user.role === "Admin" ? (
                    <>
                        <Link
                            href="/user"
                            onClick={handleMobileClose}
                            className={`flex items-center gap-3 px-3 py-3 transition-all
                             ${pathname === "/user"
                                    ? "border-r-4 border-teal-600 text-teal-600 bg-teal-50"
                                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                                }`}
                        >
                            <User size={20} />
                            <span className="font-medium">Users</span>
                        </Link>

                        <Link
                            href="/distributors"
                            onClick={handleMobileClose}
                            className={`flex items-center gap-3 px-3 py-3 transition-all
                             ${pathname === "/distributors"
                                    ? "border-r-4 border-teal-600 text-teal-600 bg-teal-50"
                                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                                }`}
                        >
                            <Handshake size={20} />
                            <span className="font-medium">Distributors</span>
                        </Link>

                        <Link
                            href="/suppliers"
                            onClick={handleMobileClose}
                            className={`flex items-center gap-3 px-3 py-3 transition-all
                             ${pathname === "/suppliers"
                                    ? "border-r-4 border-teal-600 text-teal-600 bg-teal-50"
                                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                                }`}
                        >
                            <Truck size={20} />
                            <span className="font-medium">Suppliers</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href="/parties"
                            onClick={handleMobileClose}
                            className={`flex items-center gap-3 px-3 py-3 transition-all
                             ${pathname === "/parties"
                                    ? "border-r-4 border-teal-600 text-teal-600 bg-teal-50"
                                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-500"
                                }`}
                        >
                            <Users size={20} />
                            <span className="font-medium">Parties</span>
                        </Link>
                    </>
                )}
            </nav>
        </aside>
    )
}
