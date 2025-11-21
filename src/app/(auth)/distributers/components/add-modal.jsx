"use client"

import { useEffect, useState } from "react";
import {
    X,
    User,
    Phone,
    Building,
    AreaChart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createDistributer, editDistributerById, getDropdownUsers } from "@/lib/slices/distributerSlice";
import SubmitButton from "@/components/submit-button";
import InputField from "@/components/input-field";
import SelectInput from "@/components/select";

export default function AddDistributorModal({ isOpen, onClose, editableDistributer }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDropdownUsers());
    }, [])

    const loading = useSelector(state => state.kmpharma.distributer.loading);
    const users = useSelector(state => state.kmpharma.distributer.users);

    const [formData, setFormData] = useState({
        user_id: "",
        phone: "",
        adress: "",
        area: "",
    });

    useEffect(() => {
        if (editableDistributer) {
            setFormData((prev) => ({
                ...prev,
                user_id: editableDistributer.user_id,
                phone: editableDistributer.phone,
                adress: editableDistributer.adress,
                area: editableDistributer.area
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
        if (editableDistributer) {
            delete formData.user_id;
            dispatch(editDistributerById({ id: editableDistributer.id, credentials: formData }));
        } else {
            dispatch(createDistributer(formData));
        }
        setFormData((prev) => ({
            ...prev,
            user_id: "",
            phone: "",
            adress: "",
            area: "",
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
                        Add Distributor
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-2 rounded-full cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                    {/* Name */}
                    <SelectInput
                        label={"User"}
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        options={users}
                        name={"user_id"}
                        disabled={editableDistributer ? true : false}
                        value={formData.user_id}
                        onChange={handleChange} />

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
                    <SubmitButton label={"Save Distributer"} loading={loading} onClick={handleSubmit} />
                </form>
            </div>
        </div>
    );
}
