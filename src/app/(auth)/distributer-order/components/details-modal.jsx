"use client";

import { getOrderDetails } from "@/lib/slices/distributerOrderSlice";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderDetailsModal({ isOpen, onClose, order }) {

    if (!isOpen || !order) return null;

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.kmpharma.distributerOrder.orderDetails);

    useEffect(() => {
        dispatch(getOrderDetails(order));
    }, [isOpen])

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2"
        >
            <div
                onClick={stop}
                className="bg-white rounded-xl shadow-lg w-full max-w-2xl flex flex-col animate-fadeIn"
            >
                {/* Header */}
                <div className="flex items-center justify-between py-4 mx-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">
                        Order Details
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-2 rounded-full transition cursor-pointer">
                        <X size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-5">

                    {/* Order Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-gray-200">
                        <Detail label="Party" value={orderDetails.party_name} />
                        <Detail label="Distributer" value={orderDetails.distributer_name} />
                        <Detail label="Date" value={new Date(orderDetails.created_at).toDateString()} />
                        <Detail label="Paid Status" value={orderDetails.paid_status} />
                        <Detail label="Total Amount" value={orderDetails.total_amount} />
                        <Detail label="Discount" value={orderDetails.discount} />
                    </div>

                    {/* Products Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-3 text-left">Product</th>
                                    <th className="p-3 text-left">Qty</th>
                                    <th className="p-3 text-left">Unit Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.details?.length > 0 ? (
                                    orderDetails.details.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            className="hover:bg-[#222]"
                                        >
                                            <td className="p-3">{item.product_name}</td>
                                            <td className="p-3">{item.quantity}</td>
                                            <td className="p-3">{item.unit_price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="p-4 text-center text-gray-400" colSpan="4">
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div>
            <p className="text-gray-700 text-sm">{label}</p>
            <p className="font-bold">{value || "—"}</p>
        </div>
    );
}
