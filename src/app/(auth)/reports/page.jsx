"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getDropdownAdminParties } from "@/lib/slices/distributerOrderSlice";
import { Calendar, Clipboard, X } from "lucide-react";
import SelectInput from "@/components/select";
import { getDropdownDistributers } from "@/lib/slices/partySlice";
import { generateReport } from "@/lib/slices/reportSlice";

const PAID_STATUS_OPTIONS = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
];

export default function Reports() {

    const dispatch = useDispatch();

    const loadData = useSelector(state => state.kmpharma.distributerOrder.loadData);
    const distributors = useSelector(state => state.kmpharma.party.distributers);
    const parties = useSelector(state => state.kmpharma.distributerOrder.parties);
    const isAdmin = useSelector(state => state.kmpharma?.auth?.loggedInUser?.role);

    const [distributorId, setDistributorId] = useState("");
    const [partyId, setPartyId] = useState("");
    const [paidStatus, setPaidStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        dispatch(getDropdownDistributers());
        dispatch(getDropdownAdminParties())
    }, [loadData])

    const handleApply = async () => {
        const result = await dispatch(generateReport({
            distributer_id: distributorId || "",
            party_id: partyId || "",
            paid_status: paidStatus || "",
            from_date: fromDate || "",
            to_date: toDate || "",
            download: true,
        }));

        // If the thunk is successful
        if (generateReport.fulfilled.match(result)) {
            const blob = result.payload; // PDF blob
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank"); // open PDF in new tab
        }
    };


    const handleClear = () => {
        setDistributorId("");
        setPaidStatus("");
        setPartyId("");
        setFromDate("");
        setToDate("");
    };

    return (
        <div>
            {
                isAdmin === "User" &&
                <div className="w-full sm:w-52 py-4">
                    <SubmitButton
                        label={"Create Order"}
                        onClick={() => setShowModal(true)} />
                </div>
            }
            <div className="w-full bg-white border border-gray-300 rounded-xl p-4 
                        grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">

                {
                    isAdmin === "Admin" &&
                    <div className="w-full">
                        <SelectInput
                            label="Distributor"
                            options={distributors}
                            value={distributorId}
                            onChange={(e) => setDistributorId(e.target.value)}
                            placeholder="Select Distributor"
                        />
                    </div>
                }

                <div className="w-full">
                    <SelectInput
                        label="Party"
                        options={parties}
                        value={partyId}
                        onChange={(e) => setPartyId(e.target.value)}
                        placeholder="Select Party"
                    />
                </div>

                {/* From Date */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Date
                    </label>
                    <div className="relative">
                        <Calendar
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 md:py-2.5 text-sm border border-gray-300 
                        rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>

                {/* To Date */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        To Date
                    </label>
                    <div className="relative">
                        <Calendar
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 md:py-2.5 text-sm border border-gray-300 
                        rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>

                {/* Paid Status */}
                <div className="w-full">
                    <SelectInput
                        label="Paid Status"
                        options={PAID_STATUS_OPTIONS}
                        value={paidStatus}
                        onChange={(e) => setPaidStatus(e.target.value)}
                        placeholder="Paid / Unpaid"
                    />
                </div>

                {/* Buttons */}
                <div className="w-full flex gap-2 items-end md:items-start md:flex-col">
                    <button
                        onClick={handleApply}
                        className="flex-1 md:w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg 
                    text-sm flex items-center justify-center gap-2"
                    >
                        <Clipboard size={16} /> Generate Report
                    </button>

                    <button
                        onClick={handleClear}
                        className="flex-1 md:w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-lg 
                    text-sm flex items-center justify-center gap-2"
                    >
                        <X size={16} /> Clear
                    </button>
                </div>

            </div>
        </div>
    )
}