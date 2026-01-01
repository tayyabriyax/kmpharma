"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import AddSuppliersModal from "./components/add-modal";
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllParties } from "@/lib/slices/partySlice";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Parties() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);

    const parties = useSelector(state => state.kmpharma.party.parties);
    const loading = useSelector(state => state.kmpharma.party.loading);
    const loadData = useSelector(state => state.kmpharma.party.loadData);

    useEffect(() => {
        dispatch(getAllParties());
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
                    label={"Add Parties"}
                    onClick={() => setShowModal(true)} />
            </div>
            <ResponsiveTable data={parties} isLoading={loading} />
            <AddSuppliersModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}