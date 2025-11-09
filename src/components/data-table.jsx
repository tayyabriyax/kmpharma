"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp, Edit, Trash } from "lucide-react";
import DeleteModal from "./delete-modal";

export default function ResponsiveTable() {
    const [openRow, setOpenRow] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleRow = (index) => {
        setOpenRow(openRow === index ? null : index);
    };

    const data = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Distributor",
            status: "Active",
            country: "USA",
            date: "2025-11-06",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "Manager",
            status: "Inactive",
            country: "UK",
            date: "2025-11-05",
        },
    ];

    return (
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 uppercase font-bold">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3">Area</th>
                            <th className="px-4 py-3">Created At</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr
                                key={i}
                                className="border-t border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3">{item.name}</td>
                                <td className="px-4 py-3">{item.email}</td>
                                <td className="px-4 py-3">{item.role}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${item.status === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{item.country}</td>
                                <td className="px-4 py-3">{item.date}</td>
                                <td className="px-2 py-1 space-x-4">
                                    <button className="text-gray-500 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => setShowDeleteModal(true)} className="text-gray-500 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Table */}
            <div className="md:hidden divide-y divide-gray-200">
                {data.map((item, i) => {
                    const isOpen = openRow === i;
                    return (
                        <div
                            key={i}
                            className="px-4 py-3 hover:bg-gray-50 transition"
                            onClick={() => toggleRow(i)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.email}</p>
                                </div>
                                <div className="space-x-4">
                                    <button className="text-gray-500">
                                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                    <button className="text-gray-500">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => setShowDeleteModal(true)} className="text-gray-500">
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>

                            <div
                                className={`transition-all overflow-hidden ${isOpen ? "max-h-40 mt-3" : "max-h-0"
                                    }`}
                            >
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p>
                                        <span className="font-semibold">Phone:</span> {item.role}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Address:</span>{" "}
                                        <span
                                            className={`px-2 py-0.5 text-xs rounded-full ${item.status === "Active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-semibold">Area:</span> {item.country}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Created At:</span> {item.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            />
        </div>
    );
}
