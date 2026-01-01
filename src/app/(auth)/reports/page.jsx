"use client"

import { NotebookPen } from "lucide-react";
import BackButton from "@/components/back-button";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function OrdersToCompany() {

    const role = useSelector(
        (state) => state.kmpharma?.auth?.loggedInUser?.role
    );
    const isAdmin = role === "Admin";

    const menus = [
        {
            title: "Orders to Company",
            href: "/reports/orders-to-company",
            icon: NotebookPen,
        },
    ]

    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <BackButton />
            </div>
            {
                isAdmin ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {menus.map((item) => (
                            <Card key={item.title} item={item} />
                        ))}
                    </div>
                    :
                    <div className="w-full flex justify-center py-20">
                        <span>This feature is not Available</span>
                    </div>
            }
        </div>
    )
}

function Card({ item }) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            className="group bg-white border border-gray-300 rounded-xl p-6
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
                    Generate Report
                </p>
            </div>
        </Link>
    );
}