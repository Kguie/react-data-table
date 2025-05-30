import { createContext, useContext } from 'react';

import type { Column } from '../types';

interface DataTableContextProps<T> {
    data: T[];
    mode: 'auto' | 'dark' | 'light';
    columns: Column[];
    pageSize: number;
    search: string;
    setSearch: (value: string) => void;
    sortKey: string | null;
    setSortKey: (key: string) => void;
    sortAsc: boolean;
    setSortAsc: (asc: boolean) => void;
    page: number;
    setPage: (page: number) => void;
    filteredData: T[];
    sortedData: T[];
    paginatedData: T[];
}

const DataTableContext = createContext<DataTableContextProps<any> | undefined>(undefined);

export function useDataTableContext<T>() {
    const context = useContext(DataTableContext);
    if (!context) {
        throw new Error('Les composants DataTable doivent être utilisés à l\'intérieur d\'un DataTableProvider.');
    }
    return context as DataTableContextProps<T>;
}

export default DataTableContext;