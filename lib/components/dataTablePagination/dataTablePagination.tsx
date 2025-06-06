import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

import { useDataTableContext } from "../../contexts/dataTableContext";

export function DataTablePagination() {
    const { page, setPage, filteredData, pageSize } = useDataTableContext<any>();

    const totalPages = Math.ceil(filteredData.length / pageSize);

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center text-l font-bold mt-2">
            <div className="flex items-center gap-2 rounded-md bg-zinc-600">
                <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-2 py-1  disabled:opacity-50 cursor-pointer"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </button>
                {[...Array.from({ length: totalPages }, (_, i) => i + 1)].map((index) =>
                    <button
                        onClick={() => setPage(index)}
                        key={index}
                        className="px-2 py-1  cursor-pointer"
                    >
                        {index}
                    </button>
                )
                }
                <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-2 py-1  disabled:opacity-50 cursor-pointer"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
