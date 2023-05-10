import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getTableData } from "../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

// export default function Chart() {

//   return (
//     <React.Fragment>
//       <Title>Today</Title>

//     </React.Fragment>
//   );
// }
//So thu tu  Thơi gian - tên - id - số tiền

const columns = [
  { field: "_id", headerName: "ID", width: 200 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "album", headerName: "Album", width: 200 },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 90,
  },
  {
    field: "status",
    headerName: "Status",
    width: 90,
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function DashboardPage() {
  const theme = useTheme();
  const [rows, setRows] = useState("");
  const dispatch = useDispatch();
  useEffect(() => setRows(dispatch(getTableData())), [dispatch]);
  const tableData = useSelector((state) => state.order.tableData);
  const refinedTableData = tableData.map((e) => {
    return {
      _id: e._id,
      date: e.createdAt,
      username: e.userId.username,
      album: e.product[0].description,
      amount: e.product[0].price,
      status: e.orderStatus,
    };
  });
  console.log("tableData", refinedTableData);

  const lineData = refinedTableData.reduce((items, item) => {
    const { album, amount } = item;
    const itemIndex = items.findIndex((item) => item.album === album);
    if (itemIndex === -1) {
      items.push(item);
    } else {
      items[itemIndex].amount += amount;
    }

    return items;
  }, []);

  console.log(lineData, "lineData");
  return (
    <div
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        rows={refinedTableData}
        columns={columns}
        // paginationModel={{ page: 0, pageSize: 5 }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
      />

      <ResponsiveContainer>
        <LineChart
          data={lineData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="album"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
