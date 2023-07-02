import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Avatar,
  IconButton,
  Pagination,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "./dashboardSlice";
import { useNavigate } from "react-router-dom";

function  DashboardUser() {
  /* -------------------------------------------------------------------------- */
  /*                                    data                                    */
  /* -------------------------------------------------------------------------- */
  const userList = useSelector((state) => state.dashboard.userList);
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  /* -------------------------------------------------------------------------- */
  /*                                  function                                  */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------- navigate -------------------------------- */
  const navigate = useNavigate();
  /* -------------------------------- dispatch -------------------------------- */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserList({ userId: null }));
  }, [dispatch]);

  /* ---------------------------- convert timestamp --------------------------- */
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedTimestamp = `${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    return formattedTimestamp;
  };

  /* ------------------------- Pagination Event Handlers ----------------------- */
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   console                                  */
  /* -------------------------------------------------------------------------- */

  console.log("userList", userList);

  // Calculate the start and end index of users for the current page
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  // Get the users for the current page
  const displayedUsers = userList.slice(startIndex, endIndex);

  return (
    <div>
      <TableContainer
        // component={Paper}
        style={{
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "5vw" }}>#</TableCell>
              <TableCell>
                <Typography variant="button">Name</Typography>
              </TableCell>
              <TableCell style={{ width: "5vw" }}></TableCell>
              <TableCell style={{ width: "10vw" }}>
                <Typography variant="button">Date</Typography>
              </TableCell>
              <TableCell style={{ width: "5vw" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user, index) => (
              <TableRow
                onClick={() => navigate(`/dashboard/${user._id}`)}
                hover
                key={user.id}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Avatar
                      alt={user.user}
                      src={user.avatarUrl}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                    <div>
                      <div>
                        <Typography variant="body3">{user.username}</Typography>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <IconButton
                    className="favorite-button"
                    aria-label="Add to Favorites"
                    style={{ visibility: "hidden" }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Typography variant="body3">
                    {convertTimestamp(user.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell>
                  {/* Render additional menu or actions here */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(userList.length / usersPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
        }}
      />
    </div>
  );
}

export default DashboardUser;
