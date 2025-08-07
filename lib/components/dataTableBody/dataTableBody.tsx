import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

import { useDataTableContext } from "../../contexts/dataTableContext";
import { getNestedValue } from "../../utils/utils";

interface DataTableBodyProps {
    dense?: boolean
}

export function DataTableBody({
    dense = false
}: DataTableBodyProps) {
    const {
        paginatedData, columns,
        setSortKey, sortKey,
        setSortAsc, sortAsc,
        pageSize, setPageSize,
        filteredData, sortedData, hasPagination,
        language
    } = useDataTableContext();
    const dataToDisplay = hasPagination ? paginatedData : sortedData;

    return (
        <>
            <PaginationHeader
                on={hasPagination}
                language={language}
                total={filteredData.length}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            <table className="table-fixed w-full border-collapse mt-2">
                <thead className="bg-zinc-600">
                    <tr>
                        {columns.map((col, i) => (
                            <th
                                key={col.key}
                                title={col.title}
                                className={`
                 cursor-pointer
                 ${dense ? "p-2" : "p-4"}
                  ${i === 0 ? "rounded-l-lg" : ""}
                  ${i === columns.length - 1 ? "rounded-r-lg" : ""}
                `}
                                onClick={() => {
                                    if (!col.sortable) return;
                                    setSortKey(col.key);
                                    setSortAsc(sortKey === col.key ? !sortAsc : true);
                                }}
                            ><div className="flex items-center justify-between
                  text-left text-white">
                                    <span className="flex-1 truncate">{col.title}</span>
                                    {<ChevronUpIcon
                                        aria-hidden="true"
                                        className={`
                    flex-shrink-0 w-4 h-4 ml-1
                    transform transition-transform duration-200
                    ${col.sortable && sortKey === col.key
                                                ? (col.sortable && sortAsc ? "rotate-0" : "rotate-180")
                                                : "opacity-0 group-hover:opacity-100"}
                  `}
                                    />}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataToDisplay.map((row, rowIndex) => (
                        <tr key={rowIndex} >
                            {columns.map((col, colIndex) => (
                                <td
                                    key={col.key}
                                    className={`${dense ? "py-1 px-2" : "py-2 px-4"} ${colIndex === 0 ? (dense ? "pl-2" : "pl-4") : ""}`}
                                >
                                    {String(getNestedValue(row, col.key))}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

function PaginationHeader({ on, total, pageSize, setPageSize, language }: { language: "fr" | "en", on: boolean, total: number, pageSize: number, setPageSize: (value: number) => void }) {
    if (!on || total === 0) return null;
    const sizes = [5, 10, 15, 20];

    const label = useMemo(() => language === "fr" ? "Lignes par page:" : "Rows per page:", [language])

    return <div className="flex px-4 justify-between items-center">
        <p>Total : <span>{total}</span></p>
        <label className="flex gap-1 items-center text-default-400 text-small">
            {label}
            <select
                value={pageSize}
                className="bg-transparent outline-none text-default-400 text-small p- cursor-pointer"
                onChange={(e) => setPageSize(Number(e.target.value))}
            >
                {sizes.map((size, index) => <option key={index} className="bg-transparent text-black cursot-pointer" value={size}>{size}</option>)}
            </select>
        </label>
    </div>
}