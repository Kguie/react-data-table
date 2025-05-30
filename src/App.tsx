import { DataTable } from "../lib/components/dataTable";
import { DataTableSearch } from "../lib/components/dataTableSearch/dataTableSearch";
import { DataTableBody } from "../lib/main";
import type { Column } from "../lib/types";

const data = [
  {
    id: "c67ab8a7",
    firstName: "Tony",
    lastName: "Stark",
    dateOfBirth: "1970-05-29",
    startDate: "2000-10-02",
    department: "Engineering",
    address: {
      street: "1 Stark Tower",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
  },
  {
    id: "b72fc9d4",
    firstName: "Steve",
    lastName: "Rogers",
    dateOfBirth: "1918-07-04",
    startDate: "2012-05-04",
    department: "Human Resources",
    address: {
      street: "569 Brooklyn Ave",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
    },
  },
  {
    id: "f45df3a9",
    firstName: "Natasha",
    lastName: "Romanoff",
    dateOfBirth: "1984-11-22",
    startDate: "2010-04-28",
    department: "Legal",
    address: {
      street: "742 Evergreen Terrace",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
    },
  },
  {
    id: "e98ab6c3",
    firstName: "Bruce",
    lastName: "Banner",
    dateOfBirth: "1969-12-18",
    startDate: "2008-06-13",
    department: "Engineering",
    address: {
      street: "445 Gamma Drive",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
    },
  },
  {
    id: "a23bc8f1",
    firstName: "Clint",
    lastName: "Barton",
    dateOfBirth: "1971-01-07",
    startDate: "2011-04-21",
    department: "Sales",
    address: {
      street: "89 Hawkeye Lane",
      city: "Des Moines",
      state: "IA",
      zipCode: "50309",
    },
  },
  {
    id: "d56ea9b7",
    firstName: "Thor",
    lastName: "Odinson",
    dateOfBirth: "1983-05-20",
    startDate: "2011-05-06",
    department: "Marketing",
    address: {
      street: "1500 Thunder Road",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
    },
  },
  {
    id: "g87cb2e4",
    firstName: "Wanda",
    lastName: "Maximoff",
    dateOfBirth: "1989-02-10",
    startDate: "2015-05-01",
    department: "Legal",
    address: {
      street: "321 Hex Street",
      city: "Boston",
      state: "MA",
      zipCode: "02108",
    },
  },
  {
    id: "h92fd1a3",
    firstName: "Pietro",
    lastName: "Maximoff",
    dateOfBirth: "1989-02-10",
    startDate: "2015-05-01",
    department: "Sales",
    address: {
      street: "456 Speed Lane",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
    },
  },
  {
    id: "i03de7c5",
    firstName: "T'Challa",
    lastName: "Udaku",
    dateOfBirth: "1977-11-28",
    startDate: "2016-02-16",
    department: "Human Resources",
    address: {
      street: "88 Panther Way",
      city: "Atlanta",
      state: "GA",
      zipCode: "30301",
    },
  },
  {
    id: "j84ab5d9",
    firstName: "Peter",
    lastName: "Parker",
    dateOfBirth: "2001-08-10",
    startDate: "2016-04-12",
    department: "Marketing",
    address: {
      street: "20 Ingram Street",
      city: "Queens",
      state: "NY",
      zipCode: "11375",
    },
  },
];

const columns: Column[] = [
  { key: "firstName", title: "First Name", sortable: true },
  { key: "lastName", title: "Last Name", sortable: true },
  { key: "dateOfBirth", title: "Date of Birth", sortable: true },
  { key: "startDate", title: "Start Date", sortable: true },
  { key: "department", title: "Department", sortable: true },
  { key: "address.state", title: "State", sortable: true },
  { key: "address.zipCode", title: "Zip code", sortable: true },
  { key: "address.city", title: "City", sortable: true },
  { key: "address.street", title: "Street", sortable: true },
];

export default function App() {
  return <div className="p-4">
    <DataTable data={data} columns={columns}  >
      <DataTableSearch iconColor="white" />
      <DataTableBody />
    </DataTable>
  </div>
}
