"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Edit, Trash } from "lucide-react";

import DeleteModal from "@/components/delete-modal";
import { deletePartyById } from "@/lib/slices/partySlice";
import AddPartiesModal from "./add-modal";

export default function ResponsiveTable({
    data = [],
    isLoading = false,
}) {
    const [openRow, setOpenRow] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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

    const showEmptyState = !isLoading && data.length === 0;

    return (
        <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
            {/* ================= DESKTOP ================= */}
            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 uppercase font-bold">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Address</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loading */}
                        {isLoading &&
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-t">
                                    {Array.from({ length: 5 }).map((_, j) => (
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
                                    colSpan={5}
                                    className="px-4 py-10 text-center text-gray-500"
                                >
                                    No parties found
                                </td>
                            </tr>
                        )}

                        {/* Data */}
                        {!isLoading &&
                            data.map((item, i) => (
                                <tr
                                    key={i}
                                    className="border-t transition hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">
                                        {item.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.email}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.phone}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.adress}
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
                        No parties found
                    </div>
                )}

                {/* Data */}
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
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.email}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3 text-gray-500">
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
                                            <b>Phone:</b> {item.phone}
                                        </p>
                                        <p>
                                            <b>Address:</b> {item.adress}
                                        </p>
                                        <p>
                                            <b>Created At:</b>{" "}
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
                method={deletePartyById}
                onClose={() => setShowDeleteModal(false)}
            />

            <AddPartiesModal
                isOpen={showEditModal}
                editableParty={editableItem}
                onClose={() => setShowEditModal(false)}
            />
        </div>
    );
}
