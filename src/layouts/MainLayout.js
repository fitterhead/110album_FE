import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import LoadingScreen from "../components/item/LoadingScreen";
import { useSelector } from "react-redux";
function MainLayout() {
  const loadingStatus = useSelector((state) => state.content?.status);
  console.log("loadingStatus", loadingStatus);
  return (
    <Stack
    // sx={{ minHeight: "100vh" }}
    >
      <MainHeader />

      <Outlet />
      {/* {loadingStatus !== "loading" ? <Outlet /> : <LoadingScreen />} */}

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
