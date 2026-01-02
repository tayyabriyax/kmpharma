"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrdersByFilters } from "@/lib/slices/distributerOrderSlice";
import ResponsiveTable from "../components/data-table";
import BackButton from "@/components/back-button";
import SubmitButton from "@/components/submit-button";

export default function OrderDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();

    const role = useSelector(
        (state) => state.kmpharma?.auth?.loggedInUser?.role
    );
    const isAdmin = role === "Admin";
    const orders = useSelector(state => state.kmpharma.distributerOrder.distributerOrders);
    const loadData = useSelector(state => state.kmpharma.distributerOrder.loadData);
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
    }, [loadData])

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <BackButton />
            </div>
            {
                !isAdmin &&
                <div className="w-full sm:w-52 mb-4">
                    <SubmitButton
                        label={"Create Order"}
                        onClick={() => router.push(`/distributer-order/details/${id}/create-order`)}
                    />
                </div>
            }

            <ResponsiveTable data={orders} isLoading={loading} />
        </div>
    );
}
