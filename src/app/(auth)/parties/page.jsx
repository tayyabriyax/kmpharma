"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import AddSuppliersModal from "./components/add-modal";
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllParties } from "@/lib/slices/partySlice";
import BackButton from "@/components/back-button";

export default function Parties() {

    const dispatch = useDispatch();

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
                <BackButton />
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