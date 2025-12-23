"use client"

import SubmitButton from "@/components/submit-button"
import { useEffect, useState } from "react"
import ResponsiveTable from "./components/data-table";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByFilters } from "@/lib/slices/distributerOrderSlice";
import AddDistributerOrderModal from "./components/add-modal";
import BillModal from "./components/bill-modal";
import { Calendar, Filter, X } from "lucide-react";
import SelectInput from "@/components/select";

const PAID_STATUS_OPTIONS = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
];

export default function VaterinaryProducts() {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [openBillModal, setOpenBillModal] = useState(false);

    const [formData, setFormData] = useState({
        party_id: "",
        remarks: ""
    });

    const orders = useSelector(state => state.kmpharma.distributerOrder.distributerOrders);
    const paymentDetails = useSelector(state => state.kmpharma.distributerOrder.paymentDetails);
    const loadData = useSelector(state => state.kmpharma.distributerOrder.loadData);
    const distributors = useSelector(state => state.kmpharma.party.distributers);
    const parties = useSelector(state => state.kmpharma.distributerOrder.parties);
    const loading = useSelector(state => state.kmpharma.distributerOrder.loading);
    const isAdmin = useSelector(state => state.kmpharma?.auth?.loggedInUser?.role);

    const [distributorId, setDistributorId] = useState("");
    const [partyId, setPartyId] = useState("");
    const [paidStatus, setPaidStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        if (isAdmin === "Admin") {
            dispatch(getOrdersByFilters({
                distributer_id: distributorId || "",
                paid_status: paidStatus || "",
                from_date: fromDate || "",
                to_date: toDate || "",
            }));
        } else {
            dispatch(getOrdersByFilters({
                party_id: partyId || "",
                paid_status: paidStatus || "",
                from_date: fromDate || "",
                to_date: toDate || "",
            }));
        }
    }, [loadData])

    const handleApply = () => {
        if (isAdmin === "Admin") {
            dispatch(getOrdersByFilters({
                distributer_id: distributorId || "",
                paid_status: paidStatus || "",
                from_date: fromDate || "",
                to_date: toDate || "",
            }));
        } else {
            dispatch(getOrdersByFilters({
                party_id: partyId || "",
                paid_status: paidStatus || "",
                from_date: fromDate || "",
                to_date: toDate || "",
            }));
        }
    };

    const handleClear = () => {
        setDistributorId("");
        setPaidStatus("");
        setPartyId("");
        setFromDate("");
        setToDate("");

        if (isAdmin === "Admin") {
            dispatch(getOrdersByFilters({
                distributer_id: null,
                paid_status: null,
                from_date: null,
                to_date: null,
            }));
        } else {
            dispatch(getOrdersByFilters({
                party_id: null,
                paid_status: null,
                from_date: null,
                to_date: null,
            }));
        }
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
                    isAdmin === "Admin" ?
                        <div className="w-full">
                            <SelectInput
                                label="Distributor"
                                options={distributors}
                                value={distributorId}
                                onChange={(e) => setDistributorId(e.target.value)}
                                placeholder="Select Distributor"
                            />
                        </div>
                        :
                        <div className="w-full">
                            <SelectInput
                                label="Party"
                                options={parties}
                                value={partyId}
                                onChange={(e) => setPartyId(e.target.value)}
                                placeholder="Select Party"
                            />
                        </div>
                }

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
                        <Filter size={16} /> Apply
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
            <div className="w-full bg-white p-4 rounded-lg transition-shadow border-gray-300 border mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Summary</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-semibold">Total Orders</span>
                        <span className="text-sm text-gray-800">{paymentDetails?.total_orders}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-semibold">Total Paid Orders</span>
                        <span className="text-sm text-gray-800">{paymentDetails?.total_paid_orders}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-semibold">Total Unpaid Orders</span>
                        <span className="text-sm text-gray-800">{paymentDetails?.total_unpaid_orders}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-semibold">Total Paid Amount</span>
                        <span className="text-sm text-gray-800"><span className="font-semibold">Rs</span> {paymentDetails?.total_paid_amount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-semibold">Total Unpaid Amount</span>
                        <span className="text-sm text-gray-800"><span className="font-semibold">Rs</span> {paymentDetails?.total_unpaid_amount}</span>
                    </div>
                </div>
            </div>
            <ResponsiveTable data={orders} isLoading={loading} />
            <AddDistributerOrderModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                formData={formData}
                setFormData={setFormData}
                openBillModal={() => {
                    setShowModal(false);
                    setOpenBillModal(true);
                }}
            />
            <BillModal
                isOpen={openBillModal}
                partyForm={formData}
                setPartyForm={setFormData}
                onClose={() => setOpenBillModal(false)}
            />
        </div>
    )
}