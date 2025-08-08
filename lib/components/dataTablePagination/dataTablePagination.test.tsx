// src/components/__tests__/DataTablePagination.test.tsx
import { screen, render as rtlRender } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { DataTablePagination } from "./dataTablePagination"
import { DataTable } from "../dataTable"
import { DataTableBody } from "../dataTableBody/dataTableBody"
import { data, columns } from "../../utils/__mocks__/data"

describe("DataTablePagination", () => {
    it("does render when there is more than one page", () => {
        const WrapperWithPagination = () => {
            return (
                <DataTable data={data} columns={columns} pageSize={1}>
                    <DataTableBody />
                    <DataTablePagination />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithPagination })
        expect(screen.queryByTestId("previous-page-button")).toBeInTheDocument()
        expect(screen.queryByTestId("next-page-button")).toBeInTheDocument()
    })
    it("does not render when there is only one page", () => {
        const WrapperWithPagination = () => {
            return (
                <DataTable data={data.slice(0, 3)} columns={columns}>
                    <DataTableBody />
                    <DataTablePagination />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithPagination })
        expect(screen.queryByTestId("previous-page-button")).toBeNull()
        expect(screen.queryByTestId("next-page-button")).toBeNull()
    })

    it("renders up to 5 page buttons and highlights current page", () => {
        const WrapperWithPagination = () => {
            return (
                <DataTable data={data} columns={columns} pageSize={5}>
                    <DataTableBody />
                    <DataTablePagination />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithPagination })

        const pageButtons = screen.queryAllByTestId("number-page-button")
        expect(pageButtons.length).toEqual(2)

        expect(pageButtons[0]).toHaveClass("!bg-blue-500")
    })

    it("prev button is disabled on first page, next disabled on last page", async () => {
        const WrapperWithPagination = () => {
            return (
                <DataTable data={data} columns={columns} pageSize={5}>
                    <DataTableBody />
                    <DataTablePagination />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithPagination })

        const prev = screen.getByTestId("previous-page-button")
        const next = screen.getByTestId("next-page-button")

        expect(prev).toBeDisabled()
        expect(next).not.toBeDisabled()

        await userEvent.click(next)
        expect(prev).not.toBeDisabled()
        expect(next).toBeDisabled()
    })

    it("clicking a page button displays new data and updates highlight", async () => {
        const WrapperWithPagination = () => {
            return (
                <DataTable data={data} columns={columns} pageSize={5}>
                    <DataTableBody />
                    <DataTablePagination />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithPagination })

        const page2Button = screen.queryAllByTestId("number-page-button")[1]
        expect(page2Button).not.toHaveClass("!bg-blue-500")
        const firstRowPage1 = screen.getAllByRole("row")[1]
        const firstRowPage1Content = firstRowPage1.textContent

        await userEvent.click(page2Button)
        const firstRowPage2 = screen.getAllByRole("row")[1]
        const firstRowPage2Content = firstRowPage2.textContent

        expect(firstRowPage1Content).not.toEqual(firstRowPage2Content)
        expect(page2Button).toHaveClass("!bg-blue-500")
    })
})
