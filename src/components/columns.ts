import { format } from "date-fns";
import ColumnFilter from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Date of Birth",
    accessor: "date_of_birth",
    Cell: ({ value }: any) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Age",
    accessor: "age",
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Date of Birth",
        accessor: "date_of_birth",
        Cell: ({ value }: any) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
        disableFilters: true,
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
    ],
  },
];
