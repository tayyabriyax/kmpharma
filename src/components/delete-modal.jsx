"use client"

import {
    X
} from "lucide-react";
import DeleteButton from "./delete-button";
import { useDispatch } from "react-redux";
import { deleteDistributerById } from "@/lib/slices/distributerSlice";

export default function DeleteModal({ isOpen, onClose, selectedItem }) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteDistributerById(selectedItem));
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between border-b py-4 mx-6 border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Warning
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-2 rounded-full cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 py-4 space-y-4">
                    <p>Are you sure to delete this ?</p>
                    <DeleteButton onClick={handleDelete} label={"Delete"} />
                </div>
            </div>
        </div>
    );
}
