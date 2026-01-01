"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {

    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white
                               hover:bg-gray-100 transition text-gray-800 font-semibold
                               text-sm"
        >
            <ArrowLeft size={18} />
            Back
        </button>
    )
}