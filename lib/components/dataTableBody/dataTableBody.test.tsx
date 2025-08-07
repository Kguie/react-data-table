// src/components/__tests__/DataTableBody.test.tsx
import { screen, render as rtlRender } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from 'vitest'

import { DataTableBody } from './dataTableBody'
import { render } from '../../utils/tests/index'
import { data, columns } from "../../utils/__mocks__/data"
import { DataTablePagination } from '../dataTablePagination/dataTablePagination';
import { DataTable } from '../dataTable';

describe('DataTableBody', () => {
    it('displays nothing if no column in data', () => {
        render(<DataTableBody />, [], [])
        expect(screen.queryByRole('table')).toBeInTheDocument()
        // Une seule ligne (l'en-tête vide)
        const rows = screen.queryAllByRole('row')
        expect(rows.length).toEqual(1)
    })

    it('correctly displays headers according to columns', () => {
        const cols = [
            { key: 'id', title: 'ID', sortable: true },
            { key: 'name', title: 'Nom', sortable: false }
        ]
        render(<DataTableBody />, [], cols)
        expect(screen.getByText('ID')).toBeInTheDocument()
        expect(screen.getByText('Nom')).toBeInTheDocument()
    })

    it('handles sorting click on a sortable column', async () => {
        render(
            <DataTableBody />,
            data,
            columns,
        )

        // Sort by First Name (ascending) - should be Bruce first alphabetically
        await userEvent.click(screen.getByText('First Name'))
        const firstSortedRows = screen.getAllByRole("row")
        const firstSortedContent = firstSortedRows[1].textContent

        // Sort by City (ascending) - should be Atlanta first alphabetically (T'Challa)
        await userEvent.click(screen.getByText('City'))
        const secondSortedRows = screen.getAllByRole("row")
        const secondSortedContent = secondSortedRows[1].textContent

        // The content of the first row should be different after sorting by different columns
        expect(secondSortedContent).not.toEqual(firstSortedContent)

        // More specific assertions to verify sorting works correctly
        expect(firstSortedContent).toContain('Bruce') // Bruce Banner should be first when sorted by first name
        expect(secondSortedContent).toContain("T'Challa") // T'Challa lives in Atlanta, which should be first when sorted by city
    })

    it('does not trigger sorting on a non-sortable column', async () => {

        render(
            <DataTableBody />,
            data, columns
        )

        // Sort by First Name (ascending) - should be Bruce first alphabetically
        await userEvent.click(screen.getByText('First Name'))
        const firstSortedRows = screen.getAllByRole("row")
        const firstSortedContent = firstSortedRows[1].textContent

        await userEvent.click(screen.getByText('Last Name'))
        const secondSortedRows = screen.getAllByRole("row")
        const secondSortedContent = secondSortedRows[1].textContent

        expect(secondSortedContent).toEqual(firstSortedContent)
    })

    it('displays PaginationHeader when pagination is added', async () => {
        // Custom render function to properly test with pagination
        const WrapperWithPagination = () => {
            return (
                <DataTable data={data} columns={columns}>
                    <DataTableBody />
                    <DataTablePagination />
                </DataTable>
            )
        }

        rtlRender(<div />, { wrapper: WrapperWithPagination })

        expect(screen.getByText('Total :')).toBeInTheDocument()

        const select = screen.getByRole('combobox')
        await userEvent.selectOptions(select, "5")
        expect(screen.getAllByRole("row").length).toEqual(6)
    })

    it('do not display PaginationHeader if data is empty even if pagination is added', () => {
        // Custom render function to properly test with pagination
        const WrapperWithPagination = () => {
            return (
                <DataTable data={[]} columns={columns}>
                    <DataTableBody />
                    <DataTablePagination />
                </DataTable>
            )
        }

        rtlRender(<div />, { wrapper: WrapperWithPagination })

        expect(screen.queryByText('Total :')).toBeNull()
        expect(screen.queryByRole('combobox')).toBeNull()
    })
})
