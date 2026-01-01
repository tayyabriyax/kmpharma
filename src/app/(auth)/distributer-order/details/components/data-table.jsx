"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import DeleteModal from "@/components/delete-modal";
import { deleteDistributerOrderById } from "@/lib/slices/distributerOrderSlice";

export default function ResponsiveTable({
    data = [],
    isLoading = false,
}) {
    const [openRow, setOpenRow] = useState(null);

    const role = useSelector(
        (state) => state.kmpharma?.auth?.loggedInUser?.role
    );
    const isAdmin = role === "Admin";

    const toggleRow = (index) => {
        setOpenRow((prev) => (prev === index ? null : index));
    };

    const showEmptyState = !isLoading && data.length === 0;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClickOnTrash = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    };

    return (
        <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white text-gray-800">

            {/* ================= DESKTOP ================= */}
            <div className="hidden md:block">
                <table className="min-w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 uppercase font-bold">
                        <tr>
                            <th className="px-4 py-3">
                                #
                            </th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Created At</th>
                            <th className="px-4 py-3 w-10"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loading */}
                        {isLoading &&
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-t border-gray-200">
                                    {Array.from({ length: 4 }).map((_, j) => (
                                        <td key={j} className="px-4 py-3">
                                            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                                        </td>
                                    ))}
                                </tr>
                            ))}

                        {/* Empty */}
                        {showEmptyState && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-10 text-center text-gray-500"
                                >
                                    No orders found
                                </td>
                            </tr>
                        )}

                        {/* Data */}
                        {!isLoading &&
                            data.map((item, i) => {
                                const isOpen = openRow === i;

                                return (
                                    <React.Fragment key={i}>
                                        <tr
                                            key={i}
                                            className="border-t border-gray-200 cursor-pointer hover:bg-gray-50"
                                            onClick={() => toggleRow(i)}
                                        >
                                            <td className="px-4 py-3">
                                                Order - {item.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.paid_status}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(item.created_at).toDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                {isOpen ? (
                                                    <ChevronUp size={18} />
                                                ) : (
                                                    <ChevronDown size={18} />
                                                )}
                                            </td>
                                        </tr>

                                        {/* Expanded Row (same content as mobile) */}
                                        {isOpen && (
                                            <tr className="border-t border-gray-200 bg-gray-50">
                                                <td colSpan={4} className="px-4 py-4">
                                                    <div className="space-y-5">

                                                        <div className="space-y-1 text-sm text-gray-600">
                                                            <p><b>Distributer :</b> {item.distributer_name}</p>
                                                            <p><b>Party :</b> {item.party_name}</p>
                                                            <p><b>Total Amount :</b> Rs {item.total_amount}</p>
                                                            <p>
                                                                <b>Created At :</b>{" "}
                                                                {new Date(item.created_at).toDateString()}
                                                            </p>
                                                        </div>

                                                        {/* Products Table (UNCHANGED) */}
                                                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                                                            <table className="w-full text-sm">
                                                                <thead className="bg-gray-200">
                                                                    <tr>
                                                                        <th className="p-3 text-left">Product</th>
                                                                        <th className="p-3 text-left">Qty</th>
                                                                        <th className="p-3 text-left">Unit Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.items?.length > 0 ? (
                                                                        item.items.map((p, idx) => (
                                                                            <tr key={idx} className="hover:bg-gray-100">
                                                                                <td className="p-3">{p.product_name}</td>
                                                                                <td className="p-3">{p.quantity}</td>
                                                                                <td className="p-3">{p.unit_price}</td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td
                                                                                colSpan="3"
                                                                                className="p-4 text-center text-gray-400"
                                                                            >
                                                                                No products found.
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE (UNCHANGED) ================= */}
            <div className="divide-y divide-gray-200 md:hidden">
                {isLoading &&
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2 px-4 py-4">
                            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                        </div>
                    ))}

                {showEmptyState && (
                    <div className="px-4 py-10 text-center text-gray-500">
                        No orders found
                    </div>
                )}

                {!isLoading &&
                    data.map((item, i) => {
                        const isOpen = openRow === i;

                        return (
                            <div
                                key={i}
                                className="px-4 py-3 transition hover:bg-gray-50"
                                onClick={() => toggleRow(i)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            Order - {item.id}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(item.created_at).toDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button
                                        onClick={() =>
                                            handleClickOnTrash(item.id)
                                        }
                                        >
                                            <Trash size={18} />
                                        </button>
                                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>

                                </div>

                                <div
                                    className={`overflow-hidden transition-all ${isOpen ? "mt-3 max-h-fit" : "max-h-0"
                                        }`}
                                >
                                    <div className="space-y-5">
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p><b>Distributer :</b> {item.distributer_name}</p>
                                            <p><b>Party :</b> {item.party_name}</p>
                                            <p><b>Paid Status :</b> {item.paid_status}</p>
                                            <p><b>Total Amount :</b> Rs {item.total_amount}</p>
                                            <p>
                                                <b>Created At :</b>{" "}
                                                {new Date(item.created_at).toDateString()}
                                            </p>
                                        </div>

                                        {/* Products Table (UNCHANGED) */}
                                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                                            <table className="w-full text-sm">
                                                <thead className="bg-gray-200">
                                                    <tr>
                                                        <th className="p-3 text-left">Product</th>
                                                        <th className="p-3 text-left">Qty</th>
                                                        <th className="p-3 text-left">Unit Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item?.items?.length > 0 ? (
                                                        item.items.map((p, idx) => (
                                                            <tr key={idx} className="hover:bg-gray-100">
                                                                <td className="p-3">{p.product_name}</td>
                                                                <td className="p-3">{p.quantity}</td>
                                                                <td className="p-3">{p.unit_price}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td
                                                                colSpan="3"
                                                                className="p-4 text-center text-gray-400"
                                                            >
                                                                No products found.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {/* Modals */}
            <DeleteModal
                isOpen={showDeleteModal}
                selectedItem={selectedItem}
                method={deleteDistributerOrderById}
                onClose={() => setShowDeleteModal(false)}
            />
        </div>
    );
}
