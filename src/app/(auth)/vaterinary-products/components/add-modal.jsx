"use client"

import { useEffect, useState } from "react";
import {
    X,
    Truck,
    Tag,
    Folder,
    FlaskRound,
    PillBottle,
    Pill,
    Box,
    Dog,
    FileText,
    CalendarClock,
    Calendar,
    Hash,
    BadgeDollarSign,
    DollarSign,
    AlertTriangle,
    Warehouse,
    Clock,
    MessageSquare,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "@/components/submit-button";
import InputField from "@/components/input-field";
import SelectInput from "@/components/select";
import { createVaterinaryProduct, editVeterinaryProductById, getDropdownSuppliers } from "@/lib/slices/vaterinaryProductSlice";
import TextAreaField from "@/components/text-area";

export default function AddVaterinaryProductModal({ isOpen, onClose, editableProduct }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDropdownSuppliers());
    }, [])

    const loading = useSelector(state => state.kmpharma.vaterinaryProduct.loading);
    const suppliers = useSelector(state => state.kmpharma.vaterinaryProduct.suppliers);

    const [formData, setFormData] = useState({
        name: "",
        supplier_id: "",
        brand: "",
        category: "",
        composition: "",
        dosage_form: "",
        pack_size: "",
        species_targeted: "",
        usage_instructions: "",
        withdrawal_period: "",
        storage_conditions: "",
        side_effects: "",
        buying_price: 0,
        selling_price: 0,
        batch_no: "",
        manufacture_date: "",
        expiry_date: "",
        remarks: "",
    });

    useEffect(() => {
        if (editableProduct) {
            setFormData((prev) => ({
                ...prev,
                name: editableProduct.name,
                supplier_id: editableProduct.supplier_id,
                brand: editableProduct.brand,
                category: editableProduct.category,
                composition: editableProduct.composition,
                dosage_form: editableProduct.dosage_form,
                pack_size: editableProduct.pack_size,
                species_targeted: editableProduct.species_targeted,
                usage_instructions: editableProduct.usage_instructions,
                withdrawal_period: editableProduct.withdrawal_period,
                storage_conditions: editableProduct.storage_conditions,
                side_effects: editableProduct.side_effects,
                buying_price: editableProduct.buying_price,
                selling_price: editableProduct.selling_price,
                batch_no: editableProduct.batch_no,
                manufacture_date: new Date(editableProduct.manufacture_date).toISOString().slice(0, 10),
                expiry_date: new Date(editableProduct.expiry_date).toISOString().slice(0, 10),
                remarks: editableProduct.remarks,
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
            dispatch(editVeterinaryProductById({ id: editableProduct.id, credentials: formData }));
        } else {
            dispatch(createVaterinaryProduct(formData));
        }
        setFormData((prev) => ({
            ...prev,
            name: "",
            supplier_id: "",
            brand: "",
            category: "",
            composition: "",
            dosage_form: "",
            pack_size: "",
            species_targeted: "",
            usage_instructions: "",
            withdrawal_period: "",
            storage_conditions: "",
            side_effects: "",
            buying_price: 0,
            selling_price: 0,
            batch_no: "",
            manufacture_date: "",
            expiry_date: "",
            remarks: "",
        }))
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[95vh] flex flex-col animate-fadeIn">

                {/* Header */}
                <div className="flex items-center justify-between mx-5 py-5 border-b border-gray-300 shrink-0">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Add Veterinary Product
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Name */}
                            <InputField
                                label={"Name"}
                                value={formData.name}
                                onChange={handleChange}
                                icon={<PillBottle className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"name"}
                                placeholder={"Panadol"}
                                required={true} />

                            {/* Brand */}
                            <InputField
                                label={"Brand"}
                                value={formData.brand}
                                onChange={handleChange}
                                icon={<Tag className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"brand"}
                                placeholder={"Engro"}
                                required={true} />

                            {/* Supplier */}
                            <SelectInput
                                label={"Supplier"}
                                icon={<Truck className="absolute left-3 top-3 text-gray-400" size={18} />}
                                options={suppliers}
                                name={"supplier_id"}
                                value={formData.supplier_id}
                                onChange={handleChange} />

                            {/* Category */}
                            <InputField
                                label={"Category"}
                                value={formData.category}
                                onChange={handleChange}
                                icon={<Folder className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"category"}
                                placeholder={"Headache"}
                                required={true} />

                            {/* Composition */}
                            <InputField
                                label={"Composition"}
                                value={formData.composition}
                                onChange={handleChange}
                                icon={<FlaskRound className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"composition"}
                                placeholder={"e.g. Paracetamol 500mg"}
                                required={true} />

                            {/* Dosage Form */}
                            <InputField
                                label={"Dosage Form"}
                                value={formData.dosage_form}
                                onChange={handleChange}
                                icon={<Pill className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"dosage_form"}
                                placeholder={"e.g. Tablet, Syrup, Injection"}
                                required={true} />

                            {/* Pack Size */}
                            <InputField
                                label={"Pack Size"}
                                value={formData.pack_size}
                                onChange={handleChange}
                                icon={<Box className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"pack_size"}
                                placeholder={"e.g. 10 tablets, 100ml bottle"}
                                required={true} />

                            {/* Species Targeted */}
                            <InputField
                                label={"Species Targeted"}
                                value={formData.species_targeted}
                                onChange={handleChange}
                                icon={<Dog className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"species_targeted"}
                                placeholder={"e.g. Dogs, Cats, Cattle"}
                                required={true} />

                            {/* Usage Instructions */}
                            <InputField
                                label={"Usage Instructions"}
                                value={formData.usage_instructions}
                                onChange={handleChange}
                                icon={<FileText className="absolute left-3 top-3 text-gray-400" size={18} />}
                                placeholder={"e.g. Give 1 tablet per 10kg"}
                                id={"usage_instructions"}
                                required={true} />

                            {/* Withdrawal Period */}
                            <InputField
                                label={"Withdrawal Period"}
                                value={formData.withdrawal_period}
                                onChange={handleChange}
                                icon={<Clock className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"withdrawal_period"}
                                placeholder={"e.g. 3 days"}
                                required
                            />

                            {/* Storage Conditions */}
                            <InputField
                                label={"Storage Conditions"}
                                value={formData.storage_conditions}
                                onChange={handleChange}
                                icon={<Warehouse className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"storage_conditions"}
                                placeholder={"e.g. Keep below 25°C"}
                                required
                            />

                            {/* Side Effects */}
                            <InputField
                                label={"Side Effects"}
                                value={formData.side_effects}
                                onChange={handleChange}
                                icon={<AlertTriangle className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"side_effects"}
                                placeholder={"e.g. Vomiting, dizziness"}
                                required
                            />

                            {/* Buying Price */}
                            <InputField
                                label={"Buying Price"}
                                value={formData.buying_price}
                                onChange={handleChange}
                                icon={<DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"buying_price"}
                                placeholder={"e.g. 250"}
                                required
                            />

                            {/* Selling Price */}
                            <InputField
                                label={"Selling Price"}
                                value={formData.selling_price}
                                onChange={handleChange}
                                icon={<BadgeDollarSign className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"selling_price"}
                                placeholder={"e.g. 350"}
                                required
                            />

                            {/* Batch Number */}
                            <InputField
                                label={"Batch Number"}
                                value={formData.batch_no}
                                onChange={handleChange}
                                icon={<Hash className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"batch_no"}
                                placeholder={"e.g. BATCH-0021"}
                                required
                            />

                            {/* Manufacture Date */}
                            <InputField
                                label={"Manufacture Date"}
                                value={formData.manufacture_date}
                                onChange={handleChange}
                                icon={<Calendar className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"manufacture_date"}
                                type="date"
                                required
                            />

                            {/* Expiry Date */}
                            <InputField
                                label={"Expiry Date"}
                                value={formData.expiry_date}
                                onChange={handleChange}
                                icon={<CalendarClock className="absolute left-3 top-3 text-gray-400" size={18} />}
                                id={"expiry_date"}
                                type="date"
                                required
                            />

                            {/* Remarks */}
                            <TextAreaField
                                label="Remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                id="remarks"
                                placeholder="Add any important notes here..."
                                required={false}
                            />
                        </div>

                        {/* Submit Button */}
                        <SubmitButton label={"Save Vaterinary Product"} loading={loading} onClick={handleSubmit} />
                    </form>
                </div>
            </div>
        </div>
    );
}
