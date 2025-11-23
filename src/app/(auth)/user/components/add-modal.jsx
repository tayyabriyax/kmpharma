"use client"

import { useEffect, useState } from "react";
import {
    X,
    User,
    Phone,
    Building,
    Mail,
    Handshake,
    EyeOff,
    Eye,
    BadgeCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "@/components/submit-button";
import InputField from "@/components/input-field";
import SelectInput from "@/components/select";
import { createUser } from "@/lib/slices/userSlice";

const ROLES = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" }
]

export default function AddUserModal({ isOpen, onClose, editableParty }) {

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const loading = useSelector(state => state.kmpharma.party.loading);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        username: "",
        password: "",
        role: ""
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
        dispatch(createUser(formData));
        setFormData((prev) => ({
            ...prev,
            fullname: "",
            email: "",
            username: "",
            password: "",
            role: ""
        }))
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between border-b py-4 mx-6 border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Add User
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-2 rounded-full cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                    {/* Full Name */}
                    <InputField
                        label={"Full Name"}
                        value={formData.fullname}
                        onChange={handleChange}
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"fullname"}
                        placeholder={"John Doe"}
                        required={true} />


                    {/* Email */}
                    <InputField
                        label={"Email"}
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Mail className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"email"}
                        placeholder={"example@gmail.com"}
                        required={true} />

                    {/* Username */}
                    <InputField
                        label={"Username"}
                        value={formData.username}
                        onChange={handleChange}
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        id={"username"}
                        placeholder={"johndoe"}
                        required={true} />

                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Role */}
                    <SelectInput
                        label={"Role"}
                        icon={<BadgeCheck className="absolute left-3 top-3 text-gray-400" size={18} />}
                        options={ROLES}
                        name={"role"}
                        value={formData.role}
                        onChange={handleChange} />

                    {/* Submit Button */}
                    <SubmitButton label={"Save User"} loading={loading} onClick={handleSubmit} />
                </form>
            </div>
        </div>
    );
}
