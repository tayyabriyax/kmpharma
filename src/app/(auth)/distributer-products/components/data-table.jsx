"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp, Edit, Trash } from "lucide-react";
import DeleteModal from "@/components/delete-modal";
import { deleteDistributerProductById } from "@/lib/slices/distributerProductSlice";
import AddDistributerProductModal from "./add-modal";

export default function ResponsiveTable({ data }) {
    const [openRow, setOpenRow] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedItem, setSelectedItem] = useState(0);
    const [editableItem, setEditableItem] = useState(0);

    const toggleRow = (index) => {
        setOpenRow(openRow === index ? null : index);
    };

    const handleClickOnTrash = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    }

    const handleClickOnEdit = (item) => {
        setEditableItem(item);
        setShowEditModal(true);
    }

    return (
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 uppercase font-bold">
                        <tr>
                            <th className="px-4 py-3">Product Name</th>
                            <th className="px-4 py-3">Distributer Name</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr
                                key={i}
                                className="border-t border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3">{item.product_name}</td>
                                <td className="px-4 py-3">{item.distributer_name}</td>
                                <td className="px-4 py-3">{new Date(item.created_at).toDateString()}</td>
                                <td className="px-2 py-1 space-x-4">
                                    <button onClick={() => handleClickOnEdit(item)} className="text-gray-500 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                        <Edit size={18} />
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
                            // onClick={() => toggleRow(i)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{item.product_name}</p>
                                    <p className="text-sm text-gray-500">{item.distributer_name}</p>
                                </div>
                                <div className="space-x-4">
                                    {/* <button className="text-gray-500">
                                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button> */}
                                    <button onClick={() => handleClickOnEdit(item)} className="text-gray-500">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleClickOnTrash(item.id)} className="text-gray-500">
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>

                            <div
                                className={`transition-all overflow-hidden ${isOpen ? "max-h-fit mt-3" : "max-h-0"
                                    }`}
                            >
                                {/* <div className="space-y-1 text-sm text-gray-600">
                                    <p>
                                        <span className="font-semibold">Brand : </span> {item.brand}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Category : </span>{item.category}
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    );
                })}
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                selectedItem={selectedItem}
                method={deleteDistributerProductById}
                onClose={() => setShowDeleteModal(false)}
            />
            <AddDistributerProductModal
                isOpen={showEditModal}
                editableProduct={editableItem}
                onClose={() => setShowEditModal(false)} />
        </div>
    );
}
