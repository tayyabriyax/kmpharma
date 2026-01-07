"use client";

import { useMemo, useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Edit,
    Search,
    Trash,
} from "lucide-react";

import DeleteModal from "@/components/delete-modal";
import { deleteDistributerById } from "@/lib/slices/distributerSlice";
import AddDistributorModal from "./add-modal";

export default function ResponsiveTable({
    data = [],
    isLoading = false,
}) {
    const [openRow, setOpenRow] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedItem, setSelectedItem] = useState(null);
    const [editableItem, setEditableItem] = useState(null);

    const toggleRow = (index) => {
        setOpenRow((prev) => (prev === index ? null : index));
    };

    const handleClickOnTrash = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    };

    const handleClickOnEdit = (item) => {
        setEditableItem(item);
        setShowEditModal(true);
    };

    // 🔍 Filter data by name
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            item?.user?.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const showEmptyState = !isLoading && data.length === 0;

    return (
        <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white text-gray-800">
            {/* ================= SEARCH BAR ================= */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="relative max-w-sm">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 text-gray-700 placeholder:text-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-gray-400 focus:outline-none"
                    />
                </div>
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 uppercase font-bold">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3">Area</th>
                            <th className="px-4 py-3">Created At</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loading */}
                        {isLoading &&
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-t">
                                    {Array.from({ length: 7 }).map((_, j) => (
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
                                    colSpan={7}
                                    className="px-4 py-10 text-center text-gray-500"
                                >
                                    No distributors found
                                </td>
                            </tr>
                        )}

                        {/* Data */}
                        {!isLoading &&
                            filteredData.map((item, i) => (
                                <tr
                                    key={i}
                                    className="border-t border-gray-200 transition hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">
                                        {item.user.fullname}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.user.email}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.phone}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.adress}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.area}
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(
                                            item.created_at
                                        ).toDateString()}
                                    </td>
                                    <td className="px-2 py-1 text-center space-x-2">
                                        <button
                                            onClick={() =>
                                                handleClickOnEdit(item)
                                            }
                                            className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleClickOnTrash(item.id)
                                            }
                                            className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                                        >
                                            <Trash size={18} />
                                        </button>
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
                        No distributors found
                    </div>
                )}

                {/* Data */}
                {!isLoading &&
                    filteredData.map((item, i) => {
                        const isOpen = openRow === i;

                        return (
                            <div
                                key={i}
                                className="px-4 py-3 transition hover:bg-gray-50"
                            >
                                <div
                                    className="flex items-center justify-between"
                                    onClick={() => toggleRow(i)}
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {item.user.fullname}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.user.email}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        {isOpen ? (
                                            <ChevronUp size={18} />
                                        ) : (
                                            <ChevronDown size={18} />
                                        )}
                                        <button
                                            onClick={() =>
                                                handleClickOnEdit(item)
                                            }
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleClickOnTrash(item.id)
                                            }
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className={`overflow-hidden transition-all ${isOpen
                                        ? "mt-3 max-h-40"
                                        : "max-h-0"
                                        }`}
                                >
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p>
                                            <span className="font-semibold">
                                                Phone:
                                            </span>{" "}
                                            {item.phone}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Address:
                                            </span>{" "}
                                            {item.adress}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Area:
                                            </span>{" "}
                                            {item.area}
                                        </p>
                                        <p>
                                            <span className="font-semibold">
                                                Created At:
                                            </span>{" "}
                                            {new Date(
                                                item.created_at
                                            ).toDateString()}
                                        </p>
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
                method={deleteDistributerById}
                onClose={() => setShowDeleteModal(false)}
            />

            <AddDistributorModal
                isOpen={showEditModal}
                editableDistributer={editableItem}
                onClose={() => setShowEditModal(false)}
            />
        </div>
    );
}
