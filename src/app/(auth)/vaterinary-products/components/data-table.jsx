"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp, Edit, Trash } from "lucide-react";
import DeleteModal from "@/components/delete-modal";
import { deleteVaterinaryProductById } from "@/lib/slices/vaterinaryProductSlice";
import AddVaterinaryProductModal from "./add-modal";

export default function ResponsiveTable({ data, user }) {
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
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Supplier Name</th>
                            <th className="px-4 py-3">Brand</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Composition</th>
                            <th className="px-4 py-3">Dosage Form</th>
                            <th className="px-4 py-3">Created At</th>
                            {
                                user?.role === "Admin" &&
                                <th className="px-4 py-3">Action</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr
                                key={i}
                                className="border-t border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3">{item.name}</td>
                                <td className="px-4 py-3">{item.supplier_name}</td>
                                <td className="px-4 py-3">{item.brand}</td>
                                <td className="px-4 py-3">{item.category}</td>
                                <td className="px-4 py-3">{item.composition}</td>
                                <td className="px-4 py-3">{item.dosage_form}</td>
                                <td className="px-4 py-3">{new Date(item.created_at).toDateString()}</td>
                                {
                                    user?.role === "Admin" &&
                                    <td className="px-2 py-1 space-x-4">
                                        <button onClick={() => handleClickOnEdit(item)} className="text-gray-500 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleClickOnTrash(item.id)} className="text-gray-500 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                }
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
                                    <p className="text-sm text-gray-500">{item.supplier_name}</p>
                                </div>
                                <div className="space-x-4">
                                    <button className="text-gray-500">
                                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                    {
                                        user?.role === "Admin" &&
                                        <>
                                            <button onClick={() => handleClickOnEdit(item)} className="text-gray-500">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleClickOnTrash(item.id)} className="text-gray-500">
                                                <Trash size={18} />
                                            </button>
                                        </>
                                    }
                                </div>
                            </div>

                            <div
                                className={`transition-all overflow-hidden ${isOpen ? "max-h-fit mt-3" : "max-h-0"
                                    }`}
                            >
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p>
                                        <span className="font-semibold">Brand : </span> {item.brand}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Category : </span>{item.category}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Composition : </span>{item.composition}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Dosage Form : </span> {item.dosage_form}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Pack Size : </span> {item.pack_size}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Species Targeted : </span> {item.species_targeted}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Usage Instructions : </span> {item.usage_instructions}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Withdrawl Pariod : </span> {item.withdrawal_period}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Storage Conditions : </span> {item.storage_conditions}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Side Effects : </span> {item.side_effects}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Buying Price : </span> {item.buying_price}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Selling Price : </span> {item.selling_price}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Batch No : </span> {item.batch_no}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Manufacture Date : </span> {new Date(item.manufacture_date).toDateString()}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Expiry Date : </span> {new Date(item.expiry_date).toDateString()}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Remarks : </span> {item.remarks}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Created At : </span> {new Date(item.created_at).toDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                selectedItem={selectedItem}
                method={deleteVaterinaryProductById}
                onClose={() => setShowDeleteModal(false)}
            />
            <AddVaterinaryProductModal
                isOpen={showEditModal}
                editableProduct={editableItem}
                onClose={() => setShowEditModal(false)} />
        </div>
    );
}
