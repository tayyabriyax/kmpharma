"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import AddSuppliersModal from "./components/add-modal";
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllVaterinaryProducts } from "@/lib/slices/vaterinaryProductSlice";

export default function VaterinaryProducts() {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const products = useSelector(state => state.kmpharma.vaterinaryProduct.vaterinaryProducts);
    const loadData = useSelector(state => state.kmpharma.vaterinaryProduct.loadData);
    const user = useSelector(state => state.kmpharma.auth.loggedInUser);

    useEffect(() => {
        dispatch(getAllVaterinaryProducts());
    }, [loadData])

    return (
        <div>
            {
                user.role === "Admin" &&
                <div className="w-full sm:w-52 py-4">
                    <SubmitButton
                        label={"Add Vaterinary Product"}
                        onClick={() => setShowModal(true)} />
                </div>
            }
            <ResponsiveTable data={products} user={user} />
            <AddSuppliersModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}