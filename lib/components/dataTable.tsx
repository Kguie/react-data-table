import React, { useState, useMemo } from 'react';
import DataTableContext from '../contexts/dataTableContext';

interface Column {
    key: string;
    title: string;
    sortable?: boolean;
}

interface DataTableProviderProps<T> {
    data: T[];
    columns: Column[];
    pageSize?: number;
    mode?: 'auto' | 'dark' | 'light';
    children: React.ReactNode;
}

function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

export function DataTable<T extends object>({
    data,
    columns,
    pageSize = 10,
    mode = 'auto',
    children }: DataTableProviderProps<T>) {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [page, setPage] = useState(1);

    if (!children) return null;

    const filteredData = useMemo(() => {
        return search
            ? data.filter((row) =>
                JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
            )
            : data;
    }, [search, data]);

    const sortedData = useMemo(() => {
        if (!sortKey) return filteredData;
        return [...filteredData].sort((a, b) => {
            const valA = getNestedValue(a, sortKey);
            const valB = getNestedValue(b, sortKey);
            return (valA > valB ? 1 : -1) * (sortAsc ? 1 : -1);
        });
    }, [filteredData, sortKey, sortAsc]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, page, pageSize]);

    return (
        <DataTableContext.Provider
            value={{
                data,
                columns,
                pageSize,
                search,
                setSearch,
                sortKey,
                setSortKey,
                sortAsc,
                setSortAsc,
                page,
                setPage,
                filteredData,
                sortedData,
                paginatedData,
                mode
            }}
        >
            {children}
        </DataTableContext.Provider>
    );
}
