"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllDistributerOrders } from "@/lib/slices/distributerOrderSlice";
import AddDistributerOrderModal from "./components/add-modal";
import BillModal from "./components/bill-modal";

export default function VaterinaryProducts() {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [openBillModal, setOpenBillModal] = useState(false);

    const orders = useSelector(state => state.kmpharma.distributerOrder.distributerOrders);
    const loadData = useSelector(state => state.kmpharma.distributerOrder.loadData);

    useEffect(() => {
        dispatch(getAllDistributerOrders());
    }, [loadData])

    return (
        <div>
            <div className="w-full sm:w-52 py-4">
                <SubmitButton
                    label={"Create Order"}
                    onClick={() => setShowModal(true)} />
            </div>
            <ResponsiveTable data={orders} />
            <AddDistributerOrderModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                openBillModal={() => {
                    setShowModal(false);     // close modal 1
                    setOpenBillModal(true);  // open modal 2
                }}
            />
            <BillModal
                isOpen={openBillModal}
                onClose={() => setOpenBillModal(false)}
            />
        </div>
    )
}