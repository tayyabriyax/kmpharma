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
        if (isAdmin) {
            dispatch(getOrdersByFilters({
                distributer_id: id || "",
            }));
        } else {
            dispatch(getOrdersByFilters({
                party_id: id || "",
            }));
        }
    }, [])

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white
                               hover:bg-gray-100 transition
                               text-sm font-medium"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>

            <ResponsiveTable data={orders} isLoading={loading} />
        </div>
    );
}
