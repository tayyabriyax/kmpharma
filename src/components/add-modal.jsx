"use client"

import { useState } from "react";
import {
    X,
    User,
    Mail,
    Phone,
    Building,
    AreaChart,
} from "lucide-react";
import SubmitButton from "./submit-button";
import InputField from "./input-field";
import { useDispatch, useSelector } from "react-redux";
import { createDistributer } from "@/lib/slices/distributerSlice";

export default function AddDistributorModal({ isOpen, onClose }) {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.kmpharma.distributer.loading);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        adress: "",
        area: "",
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
        dispatch(createDistributer(formData));
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between border-b py-4 mx-6 border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Add Distributor
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-2 rounded-full cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                    {/* Name */}
                    <InputField
                        label={"Full Name"}
                        value={formData.name}
                        onChange={handleChange}
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"name"}
                        placeholder={"John Doe"}
                        required={true} />

                    {/* Email */}
                    <InputField
                        label={"Email"}
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Mail className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"email"}
                        type="email"
                        placeholder={"example@gmail.com"}
                        required={true} />

                    {/* Phone */}
                    <InputField
                        label={"Phone"}
                        value={formData.phone}
                        onChange={handleChange}
                        icon={<Phone className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"phone"}
                        placeholder={"+92 328 6823465"}
                        required={true} />

                    {/* Address */}
                    <InputField
                        label={"Address"}
                        value={formData.adress}
                        onChange={handleChange}
                        icon={<Building className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"adress"}
                        placeholder={"House ABC, Street ABC, etc"}
                        required={true} />

                    {/* Area */}
                    <InputField
                        label={"Area"}
                        value={formData.area}
                        onChange={handleChange}
                        icon={<AreaChart className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"area"}
                        placeholder={"Downtown, etc"}
                        required={true} />

                    {/* Submit Button */}
                    <SubmitButton label={"Save Distributer"} onClick={handleSubmit} />
                </form>
            </div>
        </div>
    );
}
