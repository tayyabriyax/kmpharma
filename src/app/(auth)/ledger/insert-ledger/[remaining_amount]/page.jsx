"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { BadgeDollarSign } from "lucide-react";
import SelectInput from "@/components/select";
import { getDropdownDistributers } from "@/lib/slices/partySlice";
import BackButton from "@/components/back-button";
import SubmitButton from "@/components/submit-button";
import InputField from "@/components/input-field";
import { createLedger } from "@/lib/slices/ledgerSlice";
import { getDropdownSuppliers } from "@/lib/slices/vaterinaryProductSlice";
import { useParams, useRouter } from "next/navigation";

export default function InsertLedger() {

    const { remaining_amount } = useParams();

    const dispatch = useDispatch();
    const router = useRouter();

    const suppliers = useSelector(state => state.kmpharma.vaterinaryProduct.suppliers);
    const loading = useSelector(state => state.kmpharma.ledger.loading);

    const [distributorId, setDistributorId] = useState(0);
    const [supplierId, setSupplierId] = useState(0);
    const [ledgerAmount, setLedgerAmount] = useState(0);

    useEffect(() => {
        dispatch(getDropdownDistributers());
        dispatch(getDropdownSuppliers());
    }, [])

    useEffect(() => {
        setSupplierId(suppliers[0]?.value)
    }, [suppliers])

    const handleApply = async () => {
        const amount = Number(ledgerAmount);

        if (!amount || amount <= 0) {
            return alert("Enter a valid ledger amount");
        }

        if (amount > remaining_amount) {
            return alert(`Ledger amount cannot be greater than remaining amount (${remaining_amount})`);
        }

        dispatch(createLedger({
            distributer_id: distributorId || 0,
            supplier_id: supplierId || 0,
            ledger_amount: amount
        }));

        setDistributorId(0);
        setSupplierId(0);
        setLedgerAmount(0);

        router.back();
    };

    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <BackButton />
            </div>
            <div className="w-full flex justify-center">
                <div className="w-full bg-white border border-gray-300 rounded-xl p-4 space-y-4 sm:max-w-96">

                    <div className="w-full">
                        <SelectInput
                            label="Supplier"
                            options={suppliers}
                            value={supplierId}
                            onChange={(e) => setSupplierId(e.target.value)}
                            // placeholder={suppliers[0]?.label}
                        />
                    </div>

                    <div className="w-full">
                        <InputField
                            label="Ledger Amount"
                            type="number"
                            value={ledgerAmount}
                            onChange={(e) => setLedgerAmount(e.target.value)}
                            icon={<BadgeDollarSign className="absolute left-3 top-3 text-gray-400" size={18} />}
                            placeholder="Enter ledger amount"
                        />
                    </div>

                    <SubmitButton label={"Insert"} onClick={handleApply} loading={loading} />

                </div>
            </div>
        </div>
    )
}