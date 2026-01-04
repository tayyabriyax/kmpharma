"use client";

import {
    Wallet,
    AlertCircle,
    DollarSign,
} from "lucide-react";

export default function LedgerTiles({ ledger = {} }) {
    const {
        orders_total_amount = 0,
        ledger_total_amount = 0,
        left_amount = 0,
    } = ledger;

    const tiles = [
        {
            label: "Orders Total Amount",
            value: `Rs ` + orders_total_amount,
            icon: Wallet,
            color: "text-teal-600",
            bg: "bg-teal-50",
        },
        {
            label: "Paid Amount",
            value: `Rs ` + ledger_total_amount,
            icon: DollarSign,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            label: "Remaining Amount",
            value: `Rs ` + left_amount,
            icon: AlertCircle,
            color: "text-red-600",
            bg: "bg-red-50",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiles.map((tile, index) => {
                const Icon = tile.icon;
                return (
                    <div
                        key={index}
                        className="bg-white border border-gray-300 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition"
                    >
                        <div>
                            <p className="text-sm text-gray-500">{tile.label}</p>
                            <p className="text-2xl font-semibold text-gray-800 mt-1">
                                {tile.value}
                            </p>
                        </div>

                        <div
                            className={`p-3 rounded-full ${tile.bg}`}
                        >
                            <Icon className={tile.color} size={24} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
