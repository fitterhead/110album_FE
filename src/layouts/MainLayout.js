import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import LoadingScreen from "../components/item/LoadingScreen";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import TestHeader from "./TestHeader";
import AlertBar from "../components/item/AlertBar";
import { motion } from "framer-motion";

function MainLayout() {
  const loadingStatus = useSelector((state) => state.content?.isLoading);

  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRendered(true);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      {/* <TestHeader /> */}
      {rendered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      )}

      {/* {loadingStatus === true ? <LoadingScreen /> : <Outlet />} */}
      <AlertBar />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
