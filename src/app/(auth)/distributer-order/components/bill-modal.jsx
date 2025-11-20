"use client";

import { useEffect, useState } from "react";
import { X, Users, Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import SubmitButton from "@/components/submit-button";
import SelectInput from "@/components/select";
import InputField from "@/components/input-field";

import { getDropdownProducts } from "@/lib/slices/distributerProductSlice";
import { createBill, createDistributerOrder } from "@/lib/slices/distributerOrderSlice";

const PAID_STATUS = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" }
];

export default function BillModal({ isOpen, onClose }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDropdownProducts());
    }, []);

    const loading = useSelector(state => state.kmpharma.distributerProduct.loading);
    const products = useSelector(state => state.kmpharma.distributerProduct.products);
    const order_id = useSelector(state => state.kmpharma.distributerOrder.order_id);

    // MULTIPLE PRODUCT ROWS
    const [items, setItems] = useState([
        {
            product_id: "",
            quantity: "",
            unit_price: "",
            discount: 0,
            paid_status: "unpaid",
            paid_amount: 0
        }
    ]);

    // UPDATE EACH ROW
    const updateItem = (index, e) => {
        const { name, value } = e.target;
        setItems(prev => {
            const updated = [...prev];
            updated[index][name] = value;
            return updated;
        });
    };

    // ADD NEW PRODUCT SECTION
    const addNewItem = () => {
        setItems(prev => [
            ...prev,
            {
                product_id: "",
                quantity: "",
                unit_price: "",
                discount: 0,
                paid_status: "unpaid",
                paid_amount: 0
            }
        ]);
    };

    // REMOVE PRODUCT SECTION
    const removeItem = (index) => {
        // prevent removing the last remaining row
        if (items.length === 1) return;

        setItems(prev => prev.filter((_, i) => i !== index));
    };

    // SUBMIT BILL
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createBill({ order_id, formData: { "items": items } }));
        onClose(); // close modal
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[95vh] flex flex-col animate-fadeIn">

                {/* HEADER */}
                <div className="flex items-center justify-between mx-5 py-5 border-b border-gray-300 shrink-0">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create Bill
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:bg-gray-200 p-2 rounded-full transition cursor-pointer"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* FORM */}
                <div className="px-6 py-4 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* LOOP MULTIPLE PRODUCT ROWS */}
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-4 space-y-4 bg-gray-50 relative"
                            >
                                {/* REMOVE BUTTON */}
                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="absolute right-3 top-3 text-red-500 hover:text-red-700"
                                    >
                                        <X size={18} />
                                    </button>
                                )}

                                <SelectInput
                                    label={"Product"}
                                    name={"product_id"}
                                    icon={<Users className="absolute left-3 top-3 text-gray-400" size={18} />}
                                    options={products}
                                    id="product_id"
                                    value={item.product_id}
                                    onChange={(e) => updateItem(index, e)}
                                />

                                <InputField
                                    label={"Quantity"}
                                    id="quantity"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(index, e)}
                                    icon={<Phone className="absolute left-3 top-3 text-gray-400" size={18} />}
                                    placeholder="Enter quantity"
                                    required
                                />

                                <InputField
                                    label={"Unit Price"}
                                    id="unit_price"
                                    value={item.unit_price}
                                    onChange={(e) => updateItem(index, e)}
                                    icon={<Phone className="absolute left-3 top-3 text-gray-400" size={18} />}
                                    placeholder="Enter unit price"
                                    required
                                />

                                <InputField
                                    label={"Discount"}
                                    id="discount"
                                    value={item.discount}
                                    onChange={(e) => updateItem(index, e)}
                                    icon={<Phone className="absolute left-3 top-3 text-gray-400" size={18} />}
                                    placeholder="Enter discount"
                                />

                                <SelectInput
                                    label={"Paid Status"}
                                    icon={<Users className="absolute left-3 top-3 text-gray-400" size={18} />}
                                    options={PAID_STATUS}
                                    id="paid_status"
                                    name={"paid_status"}
                                    value={item.paid_status}
                                    onChange={(e) => updateItem(index, e)}
                                />

                                <InputField
                                    label={"Paid Amount"}
                                    id="paid_amount"
                                    value={item.paid_amount}
                                    onChange={(e) => updateItem(index, e)}
                                    icon={<Phone className="absolute left-3 top-3 text-gray-400" size={18} />}
                                    placeholder="Enter paid amount"
                                />
                            </div>
                        ))}

                        {/* ADD PRODUCT BUTTON */}
                        <button
                            type="button"
                            onClick={addNewItem}
                            className="w-full py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-100"
                        >
                            + Add Another Product
                        </button>

                        {/* SUBMIT BUTTON */}
                        <SubmitButton
                            label={"Create Bill"}
                            loading={loading}
                            onClick={handleSubmit}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
