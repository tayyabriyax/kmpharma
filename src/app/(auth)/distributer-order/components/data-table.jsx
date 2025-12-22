"use client"

import { useState } from "react";
import { Info, Trash } from "lucide-react";
import DeleteModal from "@/components/delete-modal";
import { deleteDistributerOrderById } from "@/lib/slices/distributerOrderSlice";
import OrderDetailsModal from "./details-modal";
import { useSelector } from "react-redux";

export default function ResponsiveTable({ data = [] }) {
    const [openRow, setOpenRow] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const isAdmin = useSelector(state => state.kmpharma?.auth?.loggedInUser?.role);

    const [selectedItem, setSelectedItem] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(0);

    const handleClickOnTrash = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    }

    const handleClickOnInfo = (id) => {
        setSelectedOrder(id);
        setShowDetailsModal(true);
    }

    return (
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 uppercase font-bold">
                        <tr>
                            <th className="px-4 py-3">{isAdmin === "Admin" ? "Distributer" : "Party"} Name</th>
                            <th className="px-4 py-3">Remarks</th>
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
                                <td className="px-4 py-3">{isAdmin === "Admin" ? item.distributer_name : item.party_name}</td>
                                <td className="px-4 py-3">{item.remarks}</td>
                                <td className="px-4 py-3">{new Date(item.created_at).toDateString()}</td>
                                <td className="px-2 py-1 space-x-4">
                                    <button onClick={() => handleClickOnInfo(item.id)} className="text-gray-500 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                        <Info size={18} />
                                    </button>
                                    <button onClick={() => handleClickOnTrash(item.id)} className="text-gray-500 cursor-pointer p-2 rounded-full hover:bg-gray-200">
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
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    {
                                        isAdmin === "Admin" ?
                                            <>
                                                <p className="font-semibold text-gray-800">{item.distributer_name}</p>
                                                <p className="text-gray-800">{item.paid_status}</p>
                                            </>
                                            :
                                            <>
                                                <p className="font-semibold text-gray-800">{item.party_name}</p>
                                                <p className="text-gray-800">{item.paid_status}</p>
                                            </>
                                    }
                                    <p className="text-sm text-gray-500">{item.remarks}</p>
                                </div>
                                <div className="space-x-4">
                                    <button onClick={() => handleClickOnInfo(item.id)} className="text-gray-500">
                                        <Info size={18} />
                                    </button>
                                    <button onClick={() => handleClickOnTrash(item.id)} className="text-gray-500">
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                selectedItem={selectedItem}
                method={deleteDistributerOrderById}
                onClose={() => setShowDeleteModal(false)}
            />
            <OrderDetailsModal
                isOpen={showDetailsModal}
                order={selectedOrder}
                onClose={() => setShowDetailsModal(false)} />
        </div>
    );
}
