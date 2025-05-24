import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
    hasSearch?: boolean;
    hasPagination?: boolean;
    searchValue: string;
    setSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Header({ hasSearch, hasPagination, searchValue, setSearchValue }: HeaderProps): React.ReactElement | null {
    if (!hasSearch && !hasPagination) return null
    return <div className="flex flex-col">
        <div className="flex">
            <SearchBar
                hasSearch={hasSearch}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
        </div>
        <div className="flex">
            <SelectPagination />
        </div>

    </div>
}

function SearchBar({ hasSearch, searchValue, setSearchValue }: {
    hasSearch: HeaderProps['hasSearch'],
    searchValue: HeaderProps['searchValue'],
    setSearchValue: HeaderProps['setSearchValue']
}) {
    if (!hasSearch) return null
    return <div className="relative w-full max-w-sm">
        <span className="absolute inset-y-0 left-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
            <MagnifyingGlassIcon color="white" className="w-6 h-6" />
        </span>
        <input
            type="text"
            placeholder="Filter..."
            value={searchValue}
            onChange={setSearchValue}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-lg bg-white dark:bg-zinc-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
}

function SelectPagination() {
    return <div></div>
}

