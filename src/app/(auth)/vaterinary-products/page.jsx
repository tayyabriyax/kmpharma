"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import AddSuppliersModal from "./components/add-modal";
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllVaterinaryProducts } from "@/lib/slices/vaterinaryProductSlice";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function VaterinaryProducts() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);

    const products = useSelector(state => state.kmpharma.vaterinaryProduct.vaterinaryProducts);
    const loading = useSelector(state => state.kmpharma.vaterinaryProduct.loading);
    const loadData = useSelector(state => state.kmpharma.vaterinaryProduct.loadData);
    const user = useSelector(state => state.kmpharma.auth.loggedInUser);

    useEffect(() => {
        dispatch(getAllVaterinaryProducts());
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
            {
                user.role === "Admin" &&
                <div className="w-full sm:w-52 mb-4">
                    <SubmitButton
                        label={"Add Vaterinary Product"}
                        onClick={() => setShowModal(true)} />
                </div>
            }
            <ResponsiveTable data={products} user={user} isLoading={loading} />
            <AddSuppliersModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}