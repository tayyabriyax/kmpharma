"use client";

import { useEffect, useState } from "react";
import { X, User, Phone, Building, AreaChart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
    createDistributer,
    editDistributerById,
    getDropdownUsers,
} from "@/lib/slices/distributerSlice";

import SubmitButton from "@/components/submit-button";
import InputField from "@/components/input-field";
import SelectInput from "@/components/select";

export default function AddDistributorModal({
    isOpen,
    onClose,
    editableDistributer,
}) {
    const dispatch = useDispatch();

    const { loading, users } = useSelector(
        (state) => state.kmpharma.distributer
    );

    const [formData, setFormData] = useState({
        user_id: "",
        phone: "",
        adress: "",
        area: "",
    });

    /* Fetch dropdown users */
    useEffect(() => {
        dispatch(getDropdownUsers());
    }, [dispatch]);

    /* Populate form when editing */
    useEffect(() => {
        if (editableDistributer && isOpen) {
            setFormData({
                user_id: editableDistributer.user_id,
                phone: editableDistributer.phone,
                adress: editableDistributer.adress,
                area: editableDistributer.area,
            });
        }

        if (!editableDistributer && isOpen) {
            setFormData({
                user_id: "",
                phone: "",
                adress: "",
                area: "",
            });
        }
    }, [editableDistributer, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editableDistributer) {
            const { user_id, ...payload } = formData;

            dispatch(
                editDistributerById({
                    id: editableDistributer.id,
                    credentials: payload,
                })
            );
        } else {
            dispatch(createDistributer(formData));
        }

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3">
            <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-lg animate-fadeIn max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {editableDistributer
                            ? "Edit Distributor"
                            : "Add Distributor"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 space-y-4 overflow-y-auto px-6 py-4"
                >
                    {/* User */}
                    <SelectInput
                        label="User"
                        icon={
                            <User
                                className="absolute left-3 top-3 text-gray-400"
                                size={18}
                            />
                        }
                        options={users}
                        name="user_id"
                        disabled={!!editableDistributer}
                        value={formData.user_id}
                        onChange={handleChange}
                    />

                    {/* Phone */}
                    <InputField
                        label="Phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={
                            <Phone
                                className="absolute left-3 top-3 text-gray-400"
                                size={18}
                            />
                        }
                        placeholder="+92 328 6823465"
                        required
                    />

                    {/* Address */}
                    <InputField
                        label="Address"
                        id="adress"
                        value={formData.adress}
                        onChange={handleChange}
                        icon={
                            <Building
                                className="absolute left-3 top-3 text-gray-400"
                                size={18}
                            />
                        }
                        placeholder="House ABC, Street ABC, etc"
                        required
                    />

                    {/* Area */}
                    <InputField
                        label="Area"
                        id="area"
                        value={formData.area}
                        onChange={handleChange}
                        icon={
                            <AreaChart
                                className="absolute left-3 top-3 text-gray-400"
                                size={18}
                            />
                        }
                        placeholder="Downtown, etc"
                        required
                    />

                    {/* Submit */}
                    <SubmitButton
                        label="Save Distributor"
                        loading={loading}
                        onClick={handleSubmit}
                    />
                </form>
            </div>
        </div>
    );
}
