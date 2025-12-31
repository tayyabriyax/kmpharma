"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrdersByFilters } from "@/lib/slices/distributerOrderSlice";
import ResponsiveTable from "../components/data-table";

export default function OrderDetails() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const role = useSelector(
        (state) => state.kmpharma?.auth?.loggedInUser?.role
    );
    const isAdmin = role === "Admin";
    const orders = useSelector(state => state.kmpharma.distributerOrder.distributerOrders);
    const loading = useSelector(state => state.kmpharma.distributerOrder.loading);

    useEffect(() => {
        if (isAdmin === "Admin") {
            dispatch(getOrdersByFilters({
                distributer_id: id || "",
                // paid_status: paidStatus || "",
                // from_date: fromDate || "",
                // to_date: toDate || "",
            }));
        } else {
            dispatch(getOrdersByFilters({
                party_id: id || "",
                // paid_status: paidStatus || "",
                // from_date: fromDate || "",
                // to_date: toDate || "",
            }));
        }
    }, [])

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border
                               hover:bg-gray-100 transition
                               text-sm font-medium"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <h1 className="text-xl font-semibold">
                    Details
                </h1>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <p className="text-sm text-gray-600">
                    {isAdmin ? "Distributer" : "Party"} ID:
                    <span className="ml-2 font-medium text-gray-900">
                        {id}
                    </span>
                </p>
            </div>
            <ResponsiveTable data={orders} isLoading={loading} />
        </div>
    );
}
