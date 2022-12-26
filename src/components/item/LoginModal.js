import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Card, IconButton, InputAdornment } from "@mui/material";
import { Stack } from "@mui/system";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FCheckbox from "../form/FCheckbox";
import FormProvider from "../form/FormProvider";
import FTextField from "../form/FTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  useNavigate,
  useLocation,
  Link as RouterLink,
  Link,
} from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F2F2F2",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
  "@media screen and (max-width: 600px)": { width: "95vw" },
};

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function LoginModal({ handleClose, open }) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;
    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h7">Signin</Typography>

              <FTextField
                name="email"
                // fullWidth
                sx={{ backgroundColor: "white" }}
                InputProps={{
                  style: {
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "23px",
                    lineHeight: "120%",
                    color: "#BDBDBD",
                  },
                }} // font size of input label
              />
              <FTextField
                // fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                sx={{ backgroundColor: "white" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "23px",
                    lineHeight: "100%",
                    color: "#BDBDBD",
                  },
                }} // font size of input label
              />

              <Box
                sx={{
                  width: "100%",
                  "& .MuiFormControlLabel-label": {
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "11px",
                    lineHeight: "120%",
                  },
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <FCheckbox
                        name="remember"
                        defaultChecked
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 40,
                            outline: "1px",
                          },
                        }}
                      />
                    }
                    label="save password"
                  />
                </FormGroup>
              </Box>

              <Box sx={{ width: "100%", backgroundColor: "primary.main" }}>
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  fullWidth
                  sx={{ height: "50px", color: "white" }}
                >
                  Signin
                </LoadingButton>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Link component={RouterLink}>
                    <Typography variant="button">Forgot Password?</Typography>
                  </Link>
                  <Link component={RouterLink}>
                    <Typography variant="button">Create New Account</Typography>
                  </Link>
                </Stack>
              </Box>
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography> */}
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </Card>
  );
}

export default LoginModal;
