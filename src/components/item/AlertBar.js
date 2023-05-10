import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useContext } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import { handleCloseAlert } from "../../features/alert/alertSlice";
import { Typography } from "@mui/material";
import { createAlertBar } from "../../features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertBar() {
  const [test, setTest] = useState(0);

  const dispatch = useDispatch();
  const alertOpen = useSelector((state) => state.alert.alertOpen);
  const alertSeverity = useSelector((state) => state.alert.alertSeverity);
  const alertMessage = useSelector((state) => state.alert.alertMessage);

  const handleClick = (boolean) => {
    setTest(test + 1);
    console.log(test, "testttt");
    if (boolean === true) {
      dispatch(createAlertBar("Success Message"));
    } else {
      dispatch(handleCloseAlert());
    }
    console.log(alertSeverity, "alertSeverity");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    handleClick(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          <Typography variant="button">{alertMessage}</Typography>
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}

export default AlertBar;
