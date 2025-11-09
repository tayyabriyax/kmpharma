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

export default function AddDistributorModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: "",
        country: "",
        date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
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
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"name"}
                        placeholder={"John Doe"}
                        required={true} />

                    {/* Email */}
                    <InputField
                        label={"Email"}
                        icon={<Mail className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"email"}
                        type="email"
                        placeholder={"example@gmail.com"}
                        required={true} />

                    {/* Phone */}
                    <InputField
                        label={"Phone"}
                        icon={<Phone className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"phone"}
                        placeholder={"+92 328 6823465"}
                        required={true} />

                    {/* Status */}
                    <InputField
                        label={"Address"}
                        icon={<Building className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"adress"}
                        placeholder={"House ABC, Street ABC, etc"}
                        required={true} />

                    {/* Country */}
                    <InputField
                        label={"Area"}
                        icon={<AreaChart className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"area"}
                        placeholder={"Downtown, etc"}
                        required={true} />

                    {/* Submit Button */}
                    <SubmitButton label={"Save Distributer"} />
                </form>
            </div>
        </div>
    );
}
