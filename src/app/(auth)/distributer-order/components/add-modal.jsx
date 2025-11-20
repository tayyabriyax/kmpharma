"use client"

import { useEffect, useState } from "react";
import {
    X,
    Handshake,
    Users,
    Phone,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "@/components/submit-button";
import SelectInput from "@/components/select";
import { getDropdownDistributers } from "@/lib/slices/partySlice";
import { createDistributerOrder, getDropdownParties } from "@/lib/slices/distributerOrderSlice";
import InputField from "@/components/input-field";

export default function AddDistributerOrderModal({ isOpen, onClose, openBillModal }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDropdownDistributers());
        dispatch(getDropdownParties());
    }, [])

    const loading = useSelector(state => state.kmpharma.distributerProduct.loading);
    const parties = useSelector(state => state.kmpharma.distributerOrder.parties);

    const [formData, setFormData] = useState({
        party_id: "",
        remarks: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = dispatch(createDistributerOrder(formData));
        if (!res.error) {
            onClose();        // close Create Order modal
            openBillModal();  // immediately open Bill Modal
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[95vh] flex flex-col animate-fadeIn">

                {/* Header */}
                <div className="flex items-center justify-between mx-5 py-5 border-b border-gray-300 shrink-0">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create Order
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:bg-gray-200 p-2 rounded-full transition cursor-pointer"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Scrollable Form */}
                <div className="px-6 py-4 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Party */}
                        <SelectInput
                            label={"Party"}
                            icon={<Users className="absolute left-3 top-3 text-gray-400" size={18} />}
                            options={parties}
                            name={"party_id"}
                            value={formData.party_id}
                            onChange={handleChange} />

                        {/* Phone */}
                        <InputField
                            label={"Remarks"}
                            value={formData.remarks}
                            onChange={handleChange}
                            icon={<Phone className="absolute left-3 top-3 text-gray-400" size={18} />}
                            id={"remarks"}
                            placeholder={"+92 328 6823465"}
                            required={true} />

                        {/* Submit Button */}
                        <SubmitButton label={"Add Items"} loading={loading} onClick={handleSubmit} />
                    </form>
                </div>
            </div>
        </div>
    );
}
