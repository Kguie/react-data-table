import { render as rtlRender } from "@testing-library/react";

import { DataTable } from "../../components/dataTable"

interface WrapperProps {
    children: React.ReactNode;
    data: any[];
    columns: any[]
};

// eslint-disable-next-line react-refresh/only-export-components
function Wrapper({ children, data, columns }: WrapperProps) {
    return (
        <DataTable data={data} columns={columns} >{children}</DataTable>
    );
}

export function render(ui: React.ReactElement, data: any[], columns: any[]) {
    rtlRender(ui, {
        wrapper: (props) => <Wrapper {...props} data={data} columns={columns} />,
    });
}