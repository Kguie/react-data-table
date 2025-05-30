import { ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

import { useDataTableContext } from "../../contexts/dataTableContext";
import { getNestedValue } from "../../utils/utils";

export function DataTableBody() {
    const { paginatedData, columns, setSortKey, sortKey, setSortAsc, sortAsc } = useDataTableContext<any>();

    return <table >
        <thead>
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.key}
                        className="text-left cursor-pointer relative pr-4 group"
                        onClick={() =>
                            col.sortable &&
                            (setSortKey(col.key),
                                setSortAsc(sortKey === col.key ? !sortAsc : true))
                        }>
                        <span  >{col.title}</span>
                        <TableHeaderIcon visible={sortKey === col.key} sortAsc={sortAsc} />
                        {/* <span aria-hidden={sortKey === col.key} className="ml-2 text-gray-500 text-right cursor">{sortAsc ? "▲" : "▼"}</span> */}

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
}

function TableHeaderIcon({ visible, sortAsc }: { visible: boolean, sortAsc: boolean }) {
    const classList = `w-4 h-4 ${!visible && "opacity-0"}`
    return <div className="absolute w-full h-full top-0 flex items-center justify-end pr-2">{sortAsc ? <ChevronUpIcon className={classList} /> : <ChevronDownIcon className={classList} />}</div>
}