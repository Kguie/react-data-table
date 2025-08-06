import { ChevronUpIcon } from "@heroicons/react/24/outline";

import { useDataTableContext } from "../../contexts/dataTableContext";
import { getNestedValue } from "../../utils/utils";

export function DataTableBody() {
    const { paginatedData, columns, setSortKey, sortKey, setSortAsc, sortAsc, pageSize, setPageSize, filteredData, hasPagination } = useDataTableContext<any>();
    const dataToDisplay = hasPagination ? paginatedData : filteredData;

    return <>
        <PaginationHeader on={hasPagination} total={filteredData.length} pageSize={pageSize} setPageSize={setPageSize} />
        <table className="border-collapse mt-2">
            <thead className="bg-zinc-600">
                <tr className="overflow-hidden">
                    {columns.map((col, index) => (
                        <th
                            key={col.key}
                            className={
                                `text-left text-white cursor-pointer relative py-2 pr-6 group ${index === 0 ? 'pl-4 rounded-l-lg' : 'pl-2'} 
                                ${index === columns.length - 1 ? 'rounded-r-lg' : ''}`}
                            onClick={() =>
                                col.sortable &&
                                (setSortKey(col.key),
                                    setSortAsc(sortKey === col.key ? !sortAsc : true))
                            }>
                            <span  >{col.title}</span>
                            <TableHeaderIcon visible={sortKey === col.key} sortAsc={sortAsc} />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dataToDisplay.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td className={`${rowIndex === 0 ? "pt-4 pb-1" : "py-1"} ${colIndex === 0 ? "pl-4" : "pl-2"} pr-2`}
                                key={col.key}>{String(getNestedValue(row, col.key))}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

function TableHeaderIcon({ visible, sortAsc }: { visible: boolean; sortAsc: boolean }) {
    return (

        <div className="absolute inset-0 flex items-center justify-end pt-1 pr-2">
            <ChevronUpIcon
                aria-hidden="true"

                className={`w-4 h-4 transform transition-transform duration-200 ${visible ? (sortAsc ? 'rotate-0' : 'rotate-180') : 'opacity-0 group-hover:opacity-100'
                    }`}
            />
        </div>

    );
}

function PaginationHeader({ on, total, pageSize, setPageSize }: { on: boolean, total: number, pageSize: number, setPageSize: (value: number) => void }) {
    if (!on || total === 0) return null;
    const sizes = [5, 10, 15, 20];

    return <div className="flex px-4 justify-between items-center">
        <p>Total : <span>{total}</span></p>
        <label className="flex gap-1 items-center text-default-400 text-small">
            Rows per page:
            <select
                value={pageSize}
                className="bg-transparent outline-none text-default-400 text-small p- cursor-pointer"
                onChange={(e) => setPageSize(Number(e.target.value))}
            >
                {sizes.map((size) => <option className="bg-transparent text-black cursot-pointer" value={size}>{size}</option>)}
            </select>
        </label>
    </div>
}