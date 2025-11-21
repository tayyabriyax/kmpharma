"use client"

import { useEffect, useState } from "react";
import {
    X,
    Handshake,
    PawPrint,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "@/components/submit-button";
import SelectInput from "@/components/select";
import { getDropdownDistributers } from "@/lib/slices/partySlice";
import { createDistributerProduct, editDistributerProductById, getDropdownProducts } from "@/lib/slices/distributerProductSlice";

export default function AddDistributerProductModal({ isOpen, onClose, editableProduct }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDropdownDistributers());
        dispatch(getDropdownProducts());
    }, [])

    const loading = useSelector(state => state.kmpharma.distributerProduct.loading);
    const distributers = useSelector(state => state.kmpharma.party.distributers);
    const products = useSelector(state => state.kmpharma.distributerProduct.products);

    const [formData, setFormData] = useState({
        distributer_id: "",
        product_id: ""
    });

    useEffect(() => {
        if (editableProduct) {
            setFormData((prev) => ({
                ...prev,
                distributer_id: editableProduct.distributer_id,
                product_id: editableProduct.product_id
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
        if (editableProduct) {
            dispatch(editDistributerProductById({ id: editableProduct.id, credentials: formData }));
        } else {
            dispatch(createDistributerProduct(formData));
        }
        setFormData((prev) => ({
            ...prev,
            distributer_id: "",
            product_id: ""
        }))
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[95vh] flex flex-col animate-fadeIn">

                {/* Header */}
                <div className="flex items-center justify-between mx-5 py-5 border-b border-gray-300 shrink-0">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Add Distributer Product
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

                        {/* Distributer */}
                        <SelectInput
                            label={"Distributer"}
                            icon={<Handshake className="absolute left-3 top-3 text-gray-400" size={18} />}
                            options={distributers}
                            name={"distributer_id"}
                            value={formData.distributer_id}
                            onChange={handleChange} />

                        {/* Product */}
                        <SelectInput
                            label={"Product"}
                            icon={<PawPrint className="absolute left-3 top-3 text-gray-400" size={18} />}
                            options={products}
                            name={"product_id"}
                            value={formData.product_id}
                            onChange={handleChange} />

                        {/* Submit Button */}
                        <SubmitButton label={"Save Distributer Product"} loading={loading} onClick={handleSubmit} />
                    </form>
                </div>
            </div>
        </div>
    );
}
