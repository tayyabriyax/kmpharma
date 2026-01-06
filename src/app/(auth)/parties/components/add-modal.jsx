"use client"

import { useEffect, useState } from "react";
import {
    X,
    User,
    Phone,
    Building,
    Mail,
    Handshake,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "@/components/submit-button";
import InputField from "@/components/input-field";
import SelectInput from "@/components/select";
import { createParty, editPartyById, getDropdownDistributers } from "@/lib/slices/partySlice";

export default function AddPartiesModal({ isOpen, onClose, editableParty }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDropdownDistributers());
    }, [])

    const loading = useSelector(state => state.kmpharma.party.loading);
    const distributers = useSelector(state => state.kmpharma.party.distributers);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        adress: "",
    });

    useEffect(() => {
        if (editableParty) {
            setFormData((prev) => ({
                ...prev,
                name: editableParty.name,
                email: editableParty.email,
                phone: editableParty.phone,
                adress: editableParty.adress,
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
        if (editableParty) {
            dispatch(editPartyById({ id: editableParty.id, credentials: formData }));
        } else {
            dispatch(createParty(formData));
        }
        setFormData((prev) => ({
            ...prev,
            name: "",
            email: "",
            phone: "",
            adress: "",
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
                        {editableParty ? "Edit" : "Add"} Party
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

                    {/* Submit Button */}
                    <SubmitButton label={"Save Party"} loading={loading} onClick={handleSubmit} />
                </form>
            </div>
        </div>
    );
}
