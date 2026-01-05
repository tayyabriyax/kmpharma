export default function LedgerTilesSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white border border-gray-300 rounded-xl p-4 flex items-center justify-between animate-pulse"
                >
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-6 w-20 bg-gray-300 rounded" />
                    </div>

                    <div className="h-12 w-12 bg-gray-200 rounded-full" />
                </div>
            ))}
        </div>
    );
}
