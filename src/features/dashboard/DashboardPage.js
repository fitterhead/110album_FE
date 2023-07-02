import React from "react";
import { Box, Grid, Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getTableData } from "../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AlertBar from "../../components/item/AlertBar";
import { styled } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ClickableText = styled(Link)(({ theme }) => ({
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const handleCellClick = (params, event) => {
  // handle cell click event here
  console.log(
    `Cell clicked: row=${params.row.username}, field=${params.field}`
  );
};

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  { field: "date", headerName: "Date", width: 100 },
  { field: "time", headerName: "Time", width: 100 },
  {
    field: "user",
    headerName: "User",
    width: 200,

    /* --------- create a clickable cell that redidrect to another page --------- */
    renderCell: (params) => (
      <Typography variant="body3">
        <ClickableText to={`/dashboard/${params.value}`}>
          {params.value}
        </ClickableText>
      </Typography>
    ),
  },
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
];

function DashboardPage() {
  const theme = useTheme();
  const [rows, setRows] = useState("");
  const [sum, setSum] = useState(0);
  const dispatch = useDispatch();
  // useEffect(() => setRows(dispatch(getTableData())), [dispatch]);
  const userId = {};
  useEffect(() => setRows(dispatch(getTableData())), [dispatch]);
  const tableData = useSelector((state) => state.order.tableData);

  // useEffect(() => {
  //   first

  // }, [third])

  const refinedTableData = tableData.map((e) => {
    const date = new Date(e.createdAt);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return {
      _id: e._id,
      date: formattedDate,
      time: formattedTime,
      user: e.userId._id,
      album: e.product[0].description,
      amount: parseInt(e.product[0].amount),
      status: e.orderStatus,
    };
  });
  console.log("initial tableData", tableData);
  console.log("tableData", refinedTableData);
  console.log("Row", rows);

  /* ---------------- get a collection of user purchase history --------------- */

  let productList = tableData.map((product) => product.product);
  productList = productList.flat(1);
  productList = productList.map((item) => item.reference_id);

  const time = new Date();

  console.log("productListttt", productList);

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

  const totalDeposit = 0;
  const totalCal = refinedTableData.map((e) => {
    return totalDeposit + e.amount;
  });
  let totalSum = 0;
  totalSum = totalCal.reduce((accumulator, value) => {
    return accumulator + parseInt(value);
  }, 0);
  console.log("total", totalSum);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <AlertBar />
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12}>
          <Typography sx={{ paddingTop: "1rem" }} variant="h1">
            Recent orders
          </Typography>
        </Grid>
        <Grid item xs={12} md={10} sx={{ height: "40vh" }}>
          {/* -------------------------------- table bar ------------------------------- */}
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
            style={theme.typography.body3}
          />
        </Grid>
        <Grid item xs={12} md={2} sx={{ height: "40vh" }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="body3" gutterBottom>
                Recent Deposits
              </Typography>
              <Typography variant="h1" component="div">
                {totalSum}$
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
              <Typography variant="body3">
                as of {time.getDate()}/{time.getMonth()} <br />
              </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
          </Card>
        </Grid>

        {/* -------------------------------------------------------------------------- */
        /*                                 line chart                                 */
        /* -------------------------------------------------------------------------- */}
        <Grid item md={12} xs={12} sx={{ height: "50vh" }} padding="2rem">
          <Typography sx={{ paddingTop: "1rem" }} variant="h1">
            Best Selling Albums
          </Typography>
          <ResponsiveContainer width="95%">
            <LineChart
              data={lineData}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 16,
              }}
            >
              <XAxis
                dataKey="album"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body1}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                style={theme.typography.body1}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: "middle",
                    fill: theme.palette.text.primary,
                    ...theme.typography.body3,
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;
