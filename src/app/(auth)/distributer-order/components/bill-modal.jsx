"use client";

import { useEffect, useState } from "react";
import { X, PawPrint, Package, BadgeDollarSign, BadgePercent } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import SubmitButton from "@/components/submit-button";
import SelectInput from "@/components/select";
import InputField from "@/components/input-field";

import { getDropdownProducts } from "@/lib/slices/distributerProductSlice";
import { createBill, createDistributerOrder } from "@/lib/slices/distributerOrderSlice";
import { getVaterinaryProductsById } from "@/lib/slices/vaterinaryProductSlice";

const PAID_STATUS = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" }
];

export default function BillModal({ isOpen, onClose, partyForm, setPartyForm }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDropdownProducts());
    }, [dispatch]);

    const loading = useSelector(state => state.kmpharma.distributerProduct.loading);
    const products = useSelector(state => state.kmpharma.distributerProduct.products || []);

    // Current single-selection form (for adding to table)
    const [currentProductId, setCurrentProductId] = useState("");
    const [currentProductLabel, setCurrentProductLabel] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState(""); // auto-filled from product details
    const [fetchingPrice, setFetchingPrice] = useState(false);

    // Table items
    const [items, setItems] = useState([]);

    // Global fields (apply to entire bill)
    const [discount, setDiscount] = useState(0);
    const [paidStatus, setPaidStatus] = useState("unpaid");
    const [totalAmount, setTotalAmount] = useState(0);

    // Dummy product details fetch - replace URL with your real endpoint
    const fetchProductDetails = async (productId) => {
        if (!productId) return;
        setFetchingPrice(true);
        try {
            const product = await dispatch(getVaterinaryProductsById(productId));
            const unitPrice = product.payload.data.selling_price;
            setUnitPrice(unitPrice);
        } catch (err) {
            console.error("Failed to fetch product details:", err);
            setUnitPrice("");
        } finally {
            setFetchingPrice(false);
        }
    };

    // When product dropdown changes
    const handleProductChange = (e) => {
        // SelectInput likely passes event-like object. If yours returns (value) adapt accordingly.
        const value = e.target ? e.target.value : e?.value;
        const selected = products.find(p => (p.value ?? p.id ?? p.value) == value) || {};
        const label = selected.label ?? selected.name ?? "";
        setCurrentProductId(value);
        setCurrentProductLabel(label);
        setUnitPrice(""); // clear while fetching
        if (value) fetchProductDetails(value);
    };

    const addProductToTable = () => {
        // basic validation
        if (!currentProductId) return alert("Select a product first");

        const qty = Number(quantity);
        const up = Number(unitPrice);

        if (!qty || qty <= 0) return alert("Enter a valid quantity");
        if (up < 0) return alert("Unit price is invalid");

        setItems(prev => {
            const existingIndex = prev.findIndex(
                item => item.product_id === currentProductId
            );

            // 🔁 Product already exists → increase quantity
            if (existingIndex !== -1) {
                return prev.map((item, index) => {
                    if (index !== existingIndex) return item;

                    const newQty = item.quantity + qty;
                    return {
                        ...item,
                        quantity: newQty,
                        total: parseFloat((newQty * item.unit_price).toFixed(2)),
                    };
                });
            }

            // ➕ New product → add row
            return [
                ...prev,
                {
                    product_id: currentProductId,
                    product_label:
                        currentProductLabel ||
                        (products.find(p => p.value == currentProductId)?.label ?? ""),
                    quantity: qty,
                    unit_price: up,
                    total: parseFloat((qty * up).toFixed(2)),
                },
            ];
        });

        // reset current selection
        setCurrentProductId("");
        setCurrentProductLabel("");
        setQuantity("");
        setUnitPrice("");
    };

    const removeItem = (index) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const calculateSubtotal = () => {
        return items.reduce((s, it) => s + (Number(it.total) || 0), 0);
    };

    useEffect(() => {
        const subtotal = calculateSubtotal();
        const disc = Number(discount) || 0;
        const afterDiscount = subtotal - disc;
        setTotalAmount(afterDiscount);
    }, [items, discount]);

    const getOrderId = async () => {
        try {
            const order = await dispatch(createDistributerOrder(partyForm));
            return order.payload.data.id;
        } catch (err) {
            console.error("Failed to fetch order", err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (items.length === 0) return alert("Add at least one product to the bill");

        const order_id = await getOrderId();
        if (!order_id) return alert("Failed to create order");

        const payload = {
            order_id,
            formData: {
                items: items.map(it => ({
                    product_id: Number(it.product_id),
                    quantity: it.quantity,
                    unit_price: it.unit_price
                })),
                order_id,
                total_amount: Number(totalAmount) || 0,
                total_discount: Number(discount) || 0,
                paid_status: paidStatus,
            }
        };

        dispatch(createBill(payload));
        setPartyForm({
            party_id: "",
            remarks: ""
        })
        setItems([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[95vh] flex flex-col animate-fadeIn overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mx-4 py-4 border-b border-gray-200 shrink-0">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">Create Bill</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="px-4 py-4 overflow-y-auto">
                    {/* 1) Product selection row */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                        <div className="col-span-1 md:col-span-3">
                            <SelectInput
                                label="Product"
                                name="product_id"
                                id="product_id"
                                options={products}
                                value={currentProductId}
                                onChange={handleProductChange}
                                icon={<PawPrint className="absolute left-3 top-3 text-gray-400" size={18} />}
                                placeholder="Select a product"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-1">
                            <InputField
                                label="Quantity"
                                id="quantity_current"
                                name="quantity_current"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                icon={<Package className="absolute left-3 top-3 text-gray-400" size={18} />}
                                placeholder="Qty"
                                required
                            />
                        </div>

                        <div className="col-span-1 md:col-span-1">
                            <InputField
                                label="Unit Price"
                                id="unit_price_current"
                                name="unit_price_current"
                                type="number"
                                value={unitPrice}
                                onChange={(e) => setUnitPrice(e.target.value)}
                                icon={<BadgeDollarSign className="absolute left-3 top-3 text-gray-400" size={18} />}
                                placeholder={fetchingPrice ? "Loading..." : "Unit price"}
                                disabled={fetchingPrice}
                            />
                        </div>

                        <div className="col-span-1 md:col-span-1">
                            <button
                                type="button"
                                onClick={addProductToTable}
                                disabled={!currentProductId || !quantity || !unitPrice}
                                className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer"
                            >
                                + Add Product
                            </button>
                        </div>
                    </div>

                    {/* 2) Table of added products */}
                    <div className="mt-6">
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <table className="min-w-full text-left">
                                <thead>
                                    <tr className="text-sm text-gray-500 border-b border-gray-200">
                                        <th className="py-2 px-3">Product</th>
                                        <th className="py-2 px-3">Qty</th>
                                        <th className="py-2 px-3">Unit Price</th>
                                        <th className="py-2 px-3">Total</th>
                                        <th className="py-2 px-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-sm text-gray-500">
                                                No products added yet
                                            </td>
                                        </tr>
                                    )}
                                    {items.map((it, idx) => (
                                        <tr key={idx} className="border-b text-gray-500 border-gray-200 last:border-b-0">
                                            <td className="py-3 px-3 text-sm">{it.product_label}</td>
                                            <td className="py-3 px-3 text-sm">{it.quantity}</td>
                                            <td className="py-3 px-3 text-sm">{it.unit_price}</td>
                                            <td className="py-3 px-3 text-sm">{it.total.toFixed(2)}</td>
                                            <td className="py-3 px-3 text-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(idx)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Subtotals & global fields */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-xl border-gray-200">
                                <p className="text-sm text-gray-500">Subtotal</p>
                                <p className="text-xl text-gray-800 font-semibold">{calculateSubtotal().toFixed(2)}</p>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-xl space-y-3">
                                <InputField
                                    label="Discount"
                                    id="discount"
                                    name="discount"
                                    type="number"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    icon={<BadgePercent className="absolute left-3 top-3 text-gray-400" size={18} />}
                                    placeholder="0.00"
                                />

                                <SelectInput
                                    label="Paid Status"
                                    id="paid_status_global"
                                    name="paid_status_global"
                                    options={PAID_STATUS}
                                    value={paidStatus}
                                    onChange={(e) => {
                                        const v = e.target ? e.target.value : e?.value;
                                        setPaidStatus(v);
                                    }}
                                />
                            </div>

                            <div className="p-4 border rounded-xl flex flex-col border-gray-200 justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Grand Total</p>
                                    <p className="text-2xl text-gray-800 font-semibold">{totalAmount}</p>
                                </div>

                                <div className="mt-4">
                                    <SubmitButton
                                        label="Create Bill"
                                        loading={loading}
                                        onClick={handleSubmit}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
