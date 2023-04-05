import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import LoadingScreen from "../components/item/LoadingScreen";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
function MainLayout() {
  const loadingStatus = useSelector((state) => state.content?.isLoading);

  return (
    <Stack
    // sx={{ minHeight: "100vh" }}
    >
      <MainHeader />

      <Outlet />
      {loadingStatus !== "loading" ? <Outlet /> : <LoadingScreen />}

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;

// <AnimatePresence>
{
  /* <motion.div
        initial={{ opacity: 0 }}
        animate={loadingStatus ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      > */
}

{
  /* </motion.div> */
}
// </AnimatePresence>
