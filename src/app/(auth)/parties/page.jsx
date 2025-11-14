"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import AddSuppliersModal from "./components/add-modal";
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllParties } from "@/lib/slices/partySlice";

export default function Parties() {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const parties = useSelector(state => state.kmpharma.party.parties);
    const loadData = useSelector(state => state.kmpharma.party.loadData);

    useEffect(() => {
        dispatch(getAllParties());
    }, [loadData])

    return (
        <div>
            <div className="w-full sm:w-52 py-4">
                <SubmitButton
                    label={"Add Parties"}
                    onClick={() => setShowModal(true)} />
            </div>
            <ResponsiveTable data={parties} />
            <AddSuppliersModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}