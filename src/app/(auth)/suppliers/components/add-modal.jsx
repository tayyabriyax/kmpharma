"use client"

import { useEffect, useState } from "react";
import {
    X,
    User,
    Phone,
    Building,
    Mail,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "@/components/submit-button";
import InputField from "@/components/input-field";
import { createSupplier, editSupplierById } from "@/lib/slices/supplierSlice";

export default function AddSuppliersModal({ isOpen, onClose, editableSupplier }) {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.kmpharma.supplier.loading);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (editableSupplier) {
            setFormData((prev) => ({
                ...prev,
                name: editableSupplier.name,
                email: editableSupplier.email,
                phone: editableSupplier.phone,
                address: editableSupplier.address
            }))
        }
    }, [isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editableSupplier) {
            delete formData.user_id;
            dispatch(editSupplierById({ id: editableSupplier.id, credentials: formData }));
        } else {
            dispatch(createSupplier(formData));
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between border-b py-4 mx-6 border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Add Supplier
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-2 rounded-full cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                    {/* Name */}
                    <InputField
                        label={"Name"}
                        value={formData.name}
                        onChange={handleChange}
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"name"}
                        placeholder={"John Doe"}
                        required={true} />


                    {/* Phone */}
                    <InputField
                        label={"Email"}
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Mail className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"email"}
                        placeholder={"example@gmail.com"}
                        required={true} />

                    {/* Address */}
                    <InputField
                        label={"Phone"}
                        value={formData.phone}
                        onChange={handleChange}
                        icon={<Phone className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"phone"}
                        placeholder={"+92 328 6823465"}
                        required={true} />

                    {/* Area */}
                    <InputField
                        label={"Address"}
                        value={formData.address}
                        onChange={handleChange}
                        icon={<Building className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"address"}
                        placeholder={"House ABC, Street ABC, etc"}
                        required={true} />

                    {/* Submit Button */}
                    <SubmitButton label={"Save Supplier"} loading={loading} onClick={handleSubmit} />
                </form>
            </div>
        </div>
    );
}
