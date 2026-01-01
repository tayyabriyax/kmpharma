"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/lib/slices/userSlice";
import AddUserModal from "./components/add-modal";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/back-button";

export default function Users() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);

    const users = useSelector(state => state.kmpharma.user.users);
    const loading = useSelector(state => state.kmpharma.user.loading);
    const loadData = useSelector(state => state.kmpharma.user.loadData);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [loadData])

    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <BackButton />
            </div>
            <div className="w-full sm:w-52 mb-4">
                <SubmitButton
                    label={"Add User"}
                    onClick={() => setShowModal(true)} />
            </div>
            <ResponsiveTable data={users} isLoading={loading} />
            <AddUserModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}