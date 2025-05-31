import { ChevronUpIcon } from "@heroicons/react/24/outline";

import { useDataTableContext } from "../../contexts/dataTableContext";
import { getNestedValue } from "../../utils/utils";

export function DataTableBody() {
    const { paginatedData, columns, setSortKey, sortKey, setSortAsc, sortAsc } = useDataTableContext<any>();

    return <div>
        <table className="border-collapse">
            <thead >
                <tr >
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            className="text-left cursor-pointer relative pr-6 group"
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
                {paginatedData.map((row, i) => (
                    <tr key={i}>
                        {columns.map((col) => (
                            <td key={col.key}>{String(getNestedValue(row, col.key))}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

function TableHeaderIcon({ visible, sortAsc }: { visible: boolean; sortAsc: boolean }) {
    return (

        <div className="absolute inset-0 flex items-center justify-end pt-1 pr-2">
            <ChevronUpIcon
                className={`w-4 h-4 transform transition-transform duration-200 ${visible ? (sortAsc ? 'rotate-0' : 'rotate-180') : 'opacity-0 group-hover:opacity-100'
                    }`}
            />
        </div>

    );
}