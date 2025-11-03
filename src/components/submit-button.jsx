export default function SubmitButton({ label }) {
    return (
        <button
            type="submit"
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-all duration-150"
        >
            {label}
        </button>
    )
}