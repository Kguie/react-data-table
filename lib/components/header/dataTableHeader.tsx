import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useDataTableContext } from '../../contexts/dataTableContext';

interface DataTableSearchProps {
    style?: React.InputHTMLAttributes<HTMLInputElement>["style"];
    iconColor?: string;
}

export default function DataTableSearch(): React.ReactElement | null {
    const { search, setSearch, mode } = useDataTableContext<any>();
    return <div className="relative w-full max-w-sm">
        <span className="absolute inset-y-0 left-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
            <MagnifyingGlassIcon color="white" className="w-6 h-6" />
        </span>
        <input
            type="text"
            placeholder="Filter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-lg bg-white dark:bg-zinc-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
}