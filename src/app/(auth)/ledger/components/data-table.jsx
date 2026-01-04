"use client";

import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
} from "lucide-react";

export default function ResponsiveTable({
    data = [],
    isLoading = false,
}) {
    const [openRow, setOpenRow] = useState(null);

    const toggleRow = (index) => {
        setOpenRow((prev) => (prev === index ? null : index));
    };

    const showEmptyState = !isLoading && data.length === 0;

    return (
        <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
            {/* ================= DESKTOP ================= */}
            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 uppercase font-bold">
                        <tr>
                            <th className="px-4 py-3">Supplier</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Created At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loading */}
                        {isLoading &&
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-t">
                                    {Array.from({
                                        length: 7,
                                    }).map((_, j) => (
                                        <td key={j} className="px-4 py-3">
                                            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                                        </td>
                                    ))}
                                </tr>
                            ))}

                        {/* Empty */}
                        {showEmptyState && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-4 py-10 text-center text-gray-500"
                                >
                                    No veterinary products found
                                </td>
                            </tr>
                        )}

                        {/* Data */}
                        {!isLoading &&
                            data.map((item, i) => (
                                <tr
                                    key={i}
                                    className="border-t transition hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">
                                        {item.supplier_name}
                                    </td>
                                    <td className="px-4 py-3">
                                        Rs {item.amount}
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(
                                            item.created_at
                                        ).toDateString()}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE ================= */}
            <div className="divide-y divide-gray-200 md:hidden">
                {/* Loading */}
                {isLoading &&
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2 px-4 py-4">
                            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                        </div>
                    ))}

                {/* Empty */}
                {showEmptyState && (
                    <div className="px-4 py-10 text-center text-gray-500">
                        No veterinary products found
                    </div>
                )}

                {/* Data */}
                {!isLoading &&
                    data.map((item, i) => {
                        const isOpen = openRow === i;

                        return (
                            <div
                                key={i}
                                className="px-4 py-3 transition hover:bg-gray-50"
                            >
                                <div
                                    className="flex items-center justify-between"
                                    onClick={() => toggleRow(i)}
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {item.supplier_name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Rs {item.amount}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        {isOpen ? (
                                            <ChevronUp size={18} />
                                        ) : (
                                            <ChevronDown size={18} />
                                        )}
                                    </div>
                                </div>

                                <div
                                    className={`overflow-hidden transition-all ${isOpen
                                        ? "mt-3 max-h-fit"
                                        : "max-h-0"
                                        }`}
                                >
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p>
                                            <b>Created At:</b>{" "}
                                            {new Date(
                                                item.created_at
                                            ).toDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
