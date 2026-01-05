"use client"

import BackButton from "@/components/back-button";
import { useDispatch, useSelector } from "react-redux";
import { getLedgerDetails } from "@/lib/slices/ledgerSlice";
import { useEffect } from "react";
import LedgerTiles from "../../components/ledger-tiles";
import LedgerTilesSkeleton from "../../components/ledger-tiles-loader";
import { useParams } from "next/navigation";
import ResponsiveTable from "../../components/data-table";

export default function LedgerDetails() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const ledgerDetails = useSelector(state => state.kmpharma?.ledger?.ledgerDetails?.ledger_entries);
    const ledger = useSelector(state => state.kmpharma?.ledger?.ledgerDetails?.ledger);
    const loading = useSelector(state => state.kmpharma.ledger.loading);

    useEffect(() => {
        dispatch(getLedgerDetails(id));
    }, [])

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
                <BackButton />
            </div>
            {loading ? (
                <LedgerTilesSkeleton />
            ) : (
                <LedgerTiles ledger={ledger} />
            )}
            <ResponsiveTable data={ledgerDetails} isLoading={loading} />
        </div>
    )
}