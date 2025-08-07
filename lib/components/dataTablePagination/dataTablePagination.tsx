import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

import { useDataTableContext } from "../../contexts/dataTableContext";
import { useMemo } from "react";

export function DataTablePagination() {
    const { page, setPage, filteredData, pageSize } = useDataTableContext<any>();

    const totalPages = Math.ceil(filteredData.length / pageSize);

    if (totalPages <= 1) return null;

    const { start, end } = useMemo(() => {
        if (page <= 3) {
            return { start: 1, end: Math.min(5, totalPages) }
        } else if (page >= totalPages - 2) {
            return { start: Math.max(1, totalPages - 4), end: totalPages }
        }
        return { start: Math.max(1, page - 2), end: Math.min(totalPages, page + 2) }
    }, [page, totalPages])

    const pagesToDisplay = useMemo(
        () =>
            Array.from(
                { length: end - start + 1 },
                (_, i) => start + i
            ),
        [start, end]
    );

    return (
        <div className="flex justify-center items-center text-l font-bold mt-2">
            <div className="flex items-center gap-2 rounded-md bg-zinc-600 px-2">
                <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`px-2 py-1 !bg-zinc-600 disabled:opacity-50 disabled:cursor-default
                         cursor-pointer 
                         ${page !== 1 ? "hover:!bg-zinc-700" : ""}`}
                >
                    <ChevronLeftIcon color="#ffffff" className="w-6 h-6" />
                </button>
                {pagesToDisplay.map((index) =>
                    <button
                        onClick={() => setPage(index)}
                        key={index}
                        className={`px-2 py-1  cursor-pointer ${index === page
                            ? "!bg-blue-500 !text-white"
                            : "!text-white !bg-zinc-600 hover:!bg-zinc-700"}
            `}
                    >
                        {index}
                    </button>
                )
                }
                <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className={`px-2 py-1 !bg-zinc-600 disabled:opacity-50 
                        disabled:cursor-default cursor-pointer 
                        ${page < totalPages ? "hover:!bg-zinc-700" : ""}`}
                >
                    <ChevronRightIcon color="#ffffff" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
