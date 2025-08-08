import { screen, render as rtlRender } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { DataTableSearch } from "./dataTableSearch"
import { DataTable } from "../dataTable"
import { DataTableBody } from "../dataTableBody/dataTableBody"
import { columns, data } from "../../utils/__mocks__/data"

describe("DataTableSearch", () => {
    it("renders with French placeholder by default", () => {
        const WrapperWithSearch = () => {
            return (
                <DataTable data={data} columns={columns} >
                    <DataTableBody />
                    <DataTableSearch />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithSearch })

        const input = screen.getByRole("searchbox")
        expect(input).toHaveAttribute("placeholder", "Rechercher...")
    })
    it("renders with English placeholder when language=en", () => {
        const WrapperWithSearch = () => {
            return (
                <DataTable data={data} columns={columns} language="en">
                    <DataTableBody />
                    <DataTableSearch />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithSearch })

        const input = screen.getByRole("searchbox")
        expect(input).toHaveAttribute("placeholder", "Search...")
    })

    it("applies fullWidth class when fullWidth=true", () => {
        const WrapperWithSearch = () => {
            return (
                <DataTable data={data} columns={columns}>
                    <DataTableBody />
                    <DataTableSearch fullWidth />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithSearch })

        const input = screen.getByRole("searchbox")
        expect(input).toHaveClass("w-full")
        expect(input.className).not.toContain("max-w-sm")
    })


    it("renders the search icon with given color", () => {
        const WrapperWithSearch = () => {
            return (
                <DataTable data={data} columns={columns}>
                    <DataTableBody />
                    <DataTableSearch fullWidth iconColor="red" />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithSearch })
        const icon = screen.getByTestId("google-icon")
        expect(icon).toHaveAttribute("color", "red")
    })

    it("calls setSearch on input change", async () => {
        const WrapperWithSearch = () => {
            return (
                <DataTable data={data} columns={columns}>
                    <DataTableBody />
                    <DataTableSearch fullWidth iconColor="red" />
                </DataTable>
            )
        }
        rtlRender(<div />, { wrapper: WrapperWithSearch })

        const input = screen.getByRole("searchbox")
        expect(screen.getAllByRole("row").length).toEqual(data.length + 1)

        await userEvent.type(input, "Ton")
        expect(screen.getAllByRole("row").length).toEqual(4)

        await userEvent.type(input, "Tony")
        expect(screen.getAllByRole("row").length).toEqual(1)

    })
})
