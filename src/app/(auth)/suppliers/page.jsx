"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import AddSuppliersModal from "./components/add-modal";
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllSuppliers } from "@/lib/slices/supplierSlice";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Distributers() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);

    const suppliers = useSelector(state => state.kmpharma.supplier.suppliers);
    const loading = useSelector(state => state.kmpharma.supplier.loading);
    const loadData = useSelector(state => state.kmpharma.supplier.loadData);

    useEffect(() => {
        dispatch(getAllSuppliers());
    }, [loadData])

    return (
        <div>
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
            <div className="w-full sm:w-52 mb-4">
                <SubmitButton
                    label={"Add Supplier"}
                    onClick={() => setShowModal(true)} />
            </div>
            <ResponsiveTable data={suppliers} isLoading={loading} />
            <AddSuppliersModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}