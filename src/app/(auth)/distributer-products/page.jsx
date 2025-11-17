"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import AddSuppliersModal from "./components/add-modal";
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllVaterinaryProducts } from "@/lib/slices/vaterinaryProductSlice";
import { getAllDistributerProducts } from "@/lib/slices/distributerProductSlice";

export default function VaterinaryProducts() {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const products = useSelector(state => state.kmpharma.distributerProduct.distributerProducts);
    const loadData = useSelector(state => state.kmpharma.distributerProduct.loadData);

    useEffect(() => {
        dispatch(getAllDistributerProducts());
    }, [loadData])

    return (
        <div>
            <div className="w-full sm:w-52 py-4">
                <SubmitButton
                    label={"Add Distributer Product"}
                    onClick={() => setShowModal(true)} />
            </div>
            <ResponsiveTable data={products} />
            <AddSuppliersModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}