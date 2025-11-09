"use client"

import AddDistributorModal from "@/components/add-modal";
import ResponsiveTable from "@/components/data-table";
import SubmitButton from "@/components/submit-button";
import { getAllDistributers } from "@/lib/slices/distributerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Distributers() {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const distributers = useSelector(state => state.kmpharma.distributer.distributers);
    const loadData = useSelector(state => state.kmpharma.distributer.loadData);

    useEffect(() => {
        dispatch(getAllDistributers());
    }, [loadData])

    return (
        <div>
            <div className="w-full sm:w-52 py-4">
                <SubmitButton
                    label={"Add Distributer"}
                    onClick={() => setShowModal(true)} />
            </div>
            <ResponsiveTable data={distributers} />
            <AddDistributorModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}