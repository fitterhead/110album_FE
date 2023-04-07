import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import LoadingScreen from "../components/item/LoadingScreen";
import { useSelector } from "react-redux";
import TestHeader from "./TestHeader";

function MainLayout() {
  const loadingStatus = useSelector((state) => state.content?.isLoading);

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      {/* <TestHeader /> */}
      <Outlet />
      {/* {loadingStatus === true ? <LoadingScreen /> : <Outlet />} */}

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
