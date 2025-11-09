import { Loader2 } from "lucide-react";

export default function DeleteButton({ label, onClick, loading = false }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`w-full py-2.5 flex justify-center items-center gap-2 
        ${loading ? "bg-red-500" : "bg-red-600 hover:bg-red-700"} 
        text-white cursor-pointer font-medium rounded-lg transition-all duration-150 
        disabled:cursor-not-allowed`}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin text-white" size={20} />
                    <span>Processing...</span>
                </>
            ) : (
                label
            )}
        </button>
    )
}