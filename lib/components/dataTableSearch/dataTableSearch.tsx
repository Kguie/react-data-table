import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useDataTableContext } from "../../contexts/dataTableContext";
import { useMemo } from "react";

interface DataTableSearchProps {
    style?: React.InputHTMLAttributes<HTMLInputElement>["style"];
    iconColor?: React.CSSProperties["color"];
    fullWidth?: boolean;
}

export function DataTableSearch({ style, iconColor = "black", fullWidth }: DataTableSearchProps) {
    const { search, setSearch, mode } = useDataTableContext<any>();

    const inputClassName = useMemo(() => {
        let className = "w-full pl-10 pr-4 py-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
        if (!fullWidth) className += " max-w-sm";
        switch (mode) {
            case "dark":
                className += " border-zinc-600 bg-zinc-600 text-white placeholder-gray-400";
                break;
            case "light":
                className += " border-gray-300 bg-white text-gray-900 placeholder-gray-400";
                break;
            default:
                className += " border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400";
                break;
        }

        return className;
    }, [fullWidth, mode]);


    return <div className="relative flex">
        <label htmlFor="data-table-search" className="sr-only">
            Rechercher dans le tableau
        </label>
        <span className="absolute inset-y-0 left-0 flex items-center px-2">
            <MagnifyingGlassIcon aria-hidden="true" color={iconColor} className="w-6 h-6" />
        </span>
        <input
            type="search"
            id="data-table-search"
            placeholder="Rechercher..."
            value={search}
            style={style}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClassName}
        />
    </div>
}