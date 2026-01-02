"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubmitButton from "@/components/submit-button";
import { getAllDistributers } from "@/lib/slices/distributerSlice";

import ResponsiveTable from "./components/data-table";
import AddDistributorModal from "./components/add-modal";
import BackButton from "@/components/back-button";

export default function DistributorsPage() {
    const dispatch = useDispatch();

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
                <BackButton />
            </div>
            {/* Header Actions */}
            <div className="flex justify-start">
                <div className="w-full sm:w-52">
                    <SubmitButton
                        label="Add Team Member"
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
