import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Alert, Card, IconButton, InputAdornment } from "@mui/material";
import { Stack } from "@mui/system";
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
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});

function RegisterModal({ handleClose, open }) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    // const from = location.state?.from?.pathname || "/";
    let { name, email, password } = data;
    try {
      await auth.register({ name, email, password }, () => {
        navigate("/", { replace: true });
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
              <Typography variant="h7">Register</Typography>
              {!!errors.responseError && (
                <Alert severity="error">{errors.responseError.message}</Alert>
              )}
              <FTextField
                name="name"
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
              <FTextField
                // fullWidth
                name="passwordConfirmation"
                type={showPasswordConfirmation ? "text" : "password"}
                sx={{ backgroundColor: "white" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswordConfirmation(!showPasswordConfirmation)
                        }
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
                {/* <FormGroup>
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
                </FormGroup> */}
              </Box>

              <Box sx={{ width: "100%", backgroundColor: "primary.main" }}>
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  fullWidth
                  sx={{ height: "50px", color: "white" }}
                >
                  Register
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
                    <Typography variant="button" to="/login">
                      Sign in
                    </Typography>
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

export default RegisterModal;
