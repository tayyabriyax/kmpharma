"use client"

import BackButton from "@/components/back-button";
import { useDispatch, useSelector } from "react-redux";
import { getLedgerDetails } from "@/lib/slices/ledgerSlice";
import { useEffect, useState } from "react";
import LedgerTiles from "./components/ledger-tiles";
import LedgerTilesSkeleton from "./components/ledger-tiles-loader";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";
import ResponsiveTable from "./components/data-table";
import { getAllDistributers } from "@/lib/slices/distributerSlice";
import TeamMemberTable from "./components/team-member-table";

export default function Ledger() {

    const role = useSelector(
        (state) => state.kmpharma?.auth?.loggedInUser?.role
    );
    const isAdmin = role === "Admin";

    const dispatch = useDispatch();
    const router = useRouter();

    const ledgerDetails = useSelector(state => state.kmpharma?.ledger?.ledgerDetails?.ledger_entries);
    const distributors = useSelector(state => state.kmpharma.distributer.distributers);
    const ledger = useSelector(state => state.kmpharma?.ledger?.ledgerDetails?.ledger);
    const loading = useSelector(state => state.kmpharma.ledger.loading);
    const distriutorLoading = useSelector(state => state.kmpharma.distributer.loading);
    const loadData = useSelector(state => state.kmpharma.ledger.loadData);

    const remaining_amount = ledger?.left_amount;

    useEffect(() => {
        dispatch(getLedgerDetails());
        if (isAdmin) {
            dispatch(getAllDistributers());
        }
    }, [loadData])

    const handleClickOnLedger = () => {
        router.push(`/ledger/insert-ledger/${remaining_amount}`);
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
                <BackButton />
            </div>
            {
                !isAdmin &&
                <SubmitButton label={"Insert Ledger"} onClick={handleClickOnLedger} />
            }
            {!isAdmin && (
                loading ? (
                    <LedgerTilesSkeleton />
                ) : (
                    <LedgerTiles ledger={ledger} />
                )
            )}
            {
                isAdmin ?
                    <>
                        <h1 className="text-lg font-bold px-2">Team Members</h1>
                        <TeamMemberTable data={distributors} isLoading={distriutorLoading} />
                    </>
                    :
                    <ResponsiveTable data={ledgerDetails} isLoading={loading} />
            }
        </div>
    )
}