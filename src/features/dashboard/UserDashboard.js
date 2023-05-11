import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCombinedList, getTableData } from "../order/orderSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlaylist } from "../content/contentSlice";
import { ResponsiveContainer } from "recharts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";
import { Card } from "@mui/material";

import {
  PieChart,
  Line,
  LineChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { Box, Container, Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function UserDashboard() {
  const { user } = useAuth();
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const accountCreated = new Date(user.createdAt).toLocaleString();
  console.log("accountCreated", accountCreated);

  const listAlbum = useSelector(
    (state) => state.content?.playlist[0]?.data?.data
  );
  const userPastOrder = useSelector((state) => state.order.tableData);

  useEffect(() => {
    dispatch(getTableData(id));
    dispatch(getPlaylist());
  }, [dispatch]);

  const customStyle = {
    fontSize: "16px",
  };
  /* ------------------------ favourited genre ordered ------------------------ */

  let productList = userPastOrder.map((product) => product.product);
  productList = productList.flat(1);
  productList = productList.map((item) => item.reference_id);

  console.log(productList, "productList before refined");
  console.log(listAlbum, "listAlbum before refined");

  const favouriteGenrePurchased = Object.values(
    productList.reduce((acc, { genre }) => {
      if (!acc[genre]) {
        acc[genre] = { genre, quantity: 0 };
      }
      acc[genre].quantity++;
      return acc;
    }, {})
  );

  console.log(favouriteGenrePurchased, "order result");

  /* ----------------- datas for line chart from order history ---------------- */
  const result = productList.reduce((acc, item) => {
    const removeDate = item.releaseDate.substr(-4);
    const year = removeDate.substr(0, 3) + "0s";

    if (!acc[year]) {
      acc[year] = 0;
      // console.log("acc[year]222", acc[year]);
    }

    if (
      parseInt(item.releaseDate.substr(-4)) >= 1940 &&
      parseInt(item.releaseDate.substr(-4)) <= 1949
    ) {
      acc["1940s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1950 &&
      parseInt(item.releaseDate.substr(-4)) <= 1959
    ) {
      acc["1950s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1960 &&
      parseInt(item.releaseDate.substr(-4)) <= 1969
    ) {
      acc["1960s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1970 &&
      parseInt(item.releaseDate.substr(-4)) <= 1979
    ) {
      acc["1970s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1980 &&
      parseInt(item.releaseDate.substr(-4)) <= 1989
    ) {
      acc["1980s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1990 &&
      parseInt(item.releaseDate.substr(-4)) <= 1999
    ) {
      acc["1990s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 2000 &&
      parseInt(item.releaseDate.substr(-4)) <= 2009
    ) {
      acc["2000s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 2010 &&
      parseInt(item.releaseDate.substr(-4)) <= 2019
    ) {
      acc["2010s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 2020 &&
      parseInt(item.releaseDate.substr(-4)) <= 2029
    ) {
      acc["2020s"]++;
    }

    return acc;
  }, {});

  const orderYear = Object.keys(result).map((year) => {
    return { year, amount: result[year] };
  });

  console.log(orderYear, "order year result");

  /* ----------------------- favourite genre on playlist ---------------------- */

  let refinedPlaylist = [];
  const refinedList = listAlbum?.map((e, index) => {
    if (e.albumRef.length !== 0) {
      refinedPlaylist.push(e.albumRef);
    }
  });

  const spreadList = refinedPlaylist?.map((e) => {
    for (let i = 0; i < e.length; i++) {
      return e[i];
    }
  });

  const favouriteGenrePlaylist = Object.values(
    spreadList.reduce((acc, { genre }) => {
      if (!acc[genre]) {
        acc[genre] = { genre, quantity: 0 };
      }
      acc[genre].quantity++;
      return acc;
    }, {})
  );

  console.log(favouriteGenrePlaylist, "playlist result");
  console.log(spreadList, "spreadList playlist result");

  /* ----------------- favourite album years saved on playlist ---------------- */

  const playlistResult = spreadList.reduce((acc, item) => {
    const removeDate = item.releaseDate.substr(-4);
    const year = removeDate.substr(0, 3) + "0s";

    if (!acc[year]) {
      acc[year] = 0;
      // console.log("acc[year]222", acc[year]);
    }

    if (
      parseInt(item.releaseDate.substr(-4)) >= 1940 &&
      parseInt(item.releaseDate.substr(-4)) <= 1949
    ) {
      acc["1940s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1950 &&
      parseInt(item.releaseDate.substr(-4)) <= 1959
    ) {
      acc["1950s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1960 &&
      parseInt(item.releaseDate.substr(-4)) <= 1969
    ) {
      acc["1960s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1970 &&
      parseInt(item.releaseDate.substr(-4)) <= 1979
    ) {
      acc["1970s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1980 &&
      parseInt(item.releaseDate.substr(-4)) <= 1989
    ) {
      acc["1980s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 1990 &&
      parseInt(item.releaseDate.substr(-4)) <= 1999
    ) {
      acc["1990s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 2000 &&
      parseInt(item.releaseDate.substr(-4)) <= 2009
    ) {
      acc["2000s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 2010 &&
      parseInt(item.releaseDate.substr(-4)) <= 2019
    ) {
      acc["2010s"]++;
    }
    if (
      parseInt(item.releaseDate.substr(-4)) >= 2020 &&
      parseInt(item.releaseDate.substr(-4)) <= 2029
    ) {
      acc["2020s"]++;
    }

    return acc;
  }, {});

  const playlistYear = Object.keys(playlistResult).map((year) => {
    return { year, amount: playlistResult[year] };
  });

  console.log(playlistYear, "playlist year result");

  /* ----------------------- data example for bar chart ----------------------- */
  //   const purchase data = [
  //     { genre: 'Rock', amount: 2 },
  //     { genre: 'Pop', amount: 4 },
  //   ];

  /* ----------------------- data example for pie chart ----------------------- */
  //   const playlist data = [
  //     { genre: 'Rock', amount: 2 },
  //     { genre: 'Pop', amount: 4 },
  //   ];
  /* ------------------- combine data of playlist and order ------------------- */
  const combinedArray = [...favouriteGenrePlaylist, ...favouriteGenrePurchased];
  console.log("combined", combinedArray);

  const outputCombinedArray = combinedArray.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.genre === item.genre);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  console.log(outputCombinedArray, "output arrayyyy");

  /* ------------------------------ tab component ----------------------------- */

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div style={{ width: "80%", margin: "0 auto" }}>{children}</div>
        )}
      </div>
    );
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Paper sx={{ padding: "1rem" }}>
            <Typography variant="h1">User</Typography>
            <Typography variant="body3">{id}</Typography>
            {/* <Typography sx={{ paddingTop: "1rem" }} variant="h1">
              Register since
            </Typography>
            <Typography variant="body3">{accountCreated}</Typography> */}
          </Paper>
        </Grid>

        {/* -------------------------------- pie chart ------------------------------- */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            align="center"
            sx={{ paddingBottom: "1rem" }}
            variant="h1"
          >
            genres on Playlist
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            {favouriteGenrePlaylist.length > 0 ? (
              <PieChart width={400} height={400} style={customStyle}>
                <Pie
                  data={favouriteGenrePlaylist}
                  dataKey="quantity"
                  nameKey="genre"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {favouriteGenrePlaylist.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`#${Math.floor(Math.random() * 16777215).toString(
                        16
                      )}`}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <Container
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center", 
                }}
              >
                <Typography variant="h1">No Data Recorded</Typography>
              </Container>
            )}
          </ResponsiveContainer>
          {/* </Box> */}
        </Grid>
        {/* -------------------------------- bar chart ------------------------------- */}

        <Grid
          item
          xs={12}
          sm={6}
          md={8}
          // justify="center" alignItems="center"
        >
          <Typography
            align="center"
            sx={{ paddingBottom: "1rem" }}
            variant="h1"
          >
            genres purchased
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              style={customStyle}
              // width={800}
              height={400}
              data={favouriteGenrePurchased}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="genre" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend iconSize={14} />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={12}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="release year of album purchased" />
            <Tab label="release year of album on playlist" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ResponsiveContainer width="100%" height={400}>
              {orderYear.length > 0 ? (
                <LineChart width={800} height={400} data={orderYear}>
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              ) : (
                <Container
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h1">No Data Recorded</Typography>
                </Container>
              )}
            </ResponsiveContainer>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ResponsiveContainer width="100%" height={400}>
              {playlistYear.length > 0 ? (
                <LineChart width={800} height={400} data={playlistYear}>
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              ) : (
                <Container
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h1">No Data Recorded</Typography>
                </Container>
              )}
            </ResponsiveContainer>
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserDashboard;
