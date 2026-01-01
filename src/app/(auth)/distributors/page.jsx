"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubmitButton from "@/components/submit-button";
import { getAllDistributers } from "@/lib/slices/distributerSlice";

import ResponsiveTable from "./components/data-table";
import AddDistributorModal from "./components/add-modal";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DistributorsPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { distributers, loadData, loading } = useSelector(
        (state) => state.kmpharma.distributer
    );

    useEffect(() => {
        dispatch(getAllDistributers());
    }, [dispatch, loadData]);

    return (
        <div className="space-y-4">
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
            {/* Header Actions */}
            <div className="flex justify-start">
                <div className="w-full sm:w-52">
                    <SubmitButton
                        label="Add Distributor"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
            </div>

            {/* Data Table */}
            <ResponsiveTable data={distributers} isLoading={loading} />

            {/* Add Modal */}
            <AddDistributorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
