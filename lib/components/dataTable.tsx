import { useState, useMemo } from "react";

import DataTableContext from "../contexts/dataTableContext";
import { getNestedValue } from "../utils/utils";
import "../index.css"
import React from "react";
import { DataTablePagination } from "../main";

interface Column {
    key: string;
    title: string;
    sortable?: boolean;
}

interface DataTableProviderProps<T> {
    data: T[];
    columns: Column[];
    pageSize?: number;
    mode?: "auto" | "dark" | "light";
    language?: "fr" | "en"
    children: React.ReactNode;
}

export function DataTable<T extends object>({
    data,
    columns,
    language = "fr",
    mode = "auto",
    children }: DataTableProviderProps<T>) {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(20);

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


    const hasPagination = React.Children.toArray(children).some(
        (child) =>
            React.isValidElement(child) && child.type === DataTablePagination
    );


    return (
        <DataTableContext.Provider
            value={{
                data,
                columns,
                pageSize,
                setPageSize,
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
                mode,
                hasPagination,
                language
            }}
        >
            <div className="flex flex-col gap-3">
                {children}
            </div>
        </DataTableContext.Provider>
    );
}
