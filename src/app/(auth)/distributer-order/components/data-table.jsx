"use client";

import { useState } from "react";
import { Info, Trash } from "lucide-react";
import { useSelector } from "react-redux";

import DeleteModal from "@/components/delete-modal";
import { deleteDistributerOrderById } from "@/lib/slices/distributerOrderSlice";
import OrderDetailsModal from "./details-modal";
import { useRouter } from "next/navigation";

export default function ResponsiveTable({
    data = [],
    isLoading = false,
}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const router = useRouter();

    const role = useSelector(
        (state) => state.kmpharma?.auth?.loggedInUser?.role
    );
    const isAdmin = role === "Admin";

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleClickOnTrash = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    };

    const handleClickOnInfo = (id) => {
        router.push(`/distributer-order/details/${id}`);
    };

    const showEmptyState = !isLoading && data.length === 0;

    return (
        <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
            {/* ================= DESKTOP ================= */}
            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 uppercase font-bold">
                        <tr>
                            <th className="px-4 py-3">
                                {isAdmin ? "Distributer" : "Party"} Name
                            </th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3">Created At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loading */}
                        {isLoading &&
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-t">
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
                            data.map((item, i) => (
                                <tr
                                    key={i}
                                    className="border-t transition hover:bg-gray-50"
                                    onClick={() =>
                                        handleClickOnInfo(item.id)
                                    }
                                >
                                    <td className="px-4 py-3">
                                        {isAdmin
                                            ? item.distributer_name
                                            : item.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.adress}
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(
                                            item.created_at
                                        ).toDateString()}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE ================= */}
            <div className="divide-y divide-gray-200 md:hidden">
                {/* Loading */}
                {isLoading &&
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2 px-4 py-4">
                            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                        </div>
                    ))}

                {/* Empty */}
                {showEmptyState && (
                    <div className="px-4 py-10 text-center text-gray-500">
                        No orders found
                    </div>
                )}

                {/* Data */}
                {!isLoading &&
                    data.map((item, i) => (
                        <div
                            key={i}
                            className="px-4 py-3 transition hover:bg-gray-50"
                            onClick={() =>
                                handleClickOnInfo(item.id)
                            }
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {isAdmin
                                            ? item?.user?.fullname
                                            : item?.name}
                                    </p>
                                    {/* <p className="text-sm text-gray-500">
                                        {item.paid_status}
                                    </p> */}
                                    <p className="text-sm text-gray-500">
                                        {item.adress}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-3">
                                    {/* <button
                                        onClick={() =>
                                            handleClickOnInfo(item.id)
                                        }
                                    >
                                        <Info size={18} />
                                    </button> */}
                                    {/* <button
                                        onClick={() =>
                                            handleClickOnTrash(item.id)
                                        }
                                    >
                                        <Trash size={18} />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
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
