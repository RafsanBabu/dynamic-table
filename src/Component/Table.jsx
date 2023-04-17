import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

import '../App.css'
import { getDefaultNormalizer } from "@testing-library/react";

function Table() {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        color: "white",
        backgroundColor: "rgb(14 241 188)",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.firstName.concat(" ").concat(row.lastName),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
      sortable: true,
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        setData(res?.data?.users);
        console.log(res);
        setPending(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div  className="table-content">
      <h3>Dynamic Table</h3>
      <DataTable
        columns={column}
        customStyles={customStyles}
        progressPending={pending}
        data={data}
        selectableRows
        pagination
        highlightOnHover
        pointerOnHover
        selectableRowsHighlight
      />
    </div>
  );
}

export default Table;
