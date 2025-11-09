"use client"

import AddDistributorModal from "@/components/add-modal";
import ResponsiveTable from "@/components/data-table";
import SubmitButton from "@/components/submit-button";
import { useState } from "react";

export default function Distributers() {

    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="w-full sm:w-52 py-4">
                <SubmitButton
                    label={"Add Distributer"}
                    onClick={() => setShowModal(true)} />
            </div>
            <ResponsiveTable />
            <AddDistributorModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}