import { yupResolver } from "@hookform/resolvers/yup";
import {
  styled,
  Box,
  Typography,
  Container,
  Stack,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { apiRouter } from "../../services/apisRouter.";
import { axiosPost } from "../../services/axios.config";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const ResetPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email address")
      .required("Email is required")
      .trim("Enter valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .trim("Enter valid password"),
    confirmPassword: yup
      .string()
      .required("Password is required")
      .trim("Enter valid password"),
    digit1: yup
      .string()
      .required("This field is required")
      .matches(/^\d$/, "Must be a digit"),
    digit2: yup
      .string()
      .required("This field is required")
      .matches(/^\d$/, "Must be a digit"),
    digit3: yup
      .string()
      .required("This field is required")
      .matches(/^\d$/, "Must be a digit"),
    digit4: yup
      .string()
      .required("This field is required")
      .matches(/^\d$/, "Must be a digit"),
    digit5: yup
      .string()
      .required("This field is required")
      .matches(/^\d$/, "Must be a digit"),
    digit6: yup
      .string()
      .required("This field is required")
      .matches(/^\d$/, "Must be a digit"),
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  };

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    console.log("reset-data :>> ", data);
    const {
      email,
      password,
      confirmPassword,
      digit1,
      digit2,
      digit3,
      digit4,
      digit5,
      digit6,
    } = data;
    const otp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
    let newOtp = +otp;

    const newData = {
      email,
      newPassword: confirmPassword,
      otp: newOtp,
    };
    console.log("newData :>> ", newData);
    setIsLoading(true);
    try {
      const response = await axiosPost(apiRouter.RESET_PASSWORD, {
        ...newData,
      });
      setIsLoading(false);
      navigate("/auth/login");
    } catch (error) {
      console.log("reset-password-error :>> ", error);
      setIsLoading(false);
      alert("please do it again");
    }
  };

  return (
    <RootStyle>
      <HeaderStyle>
        <Box sx={{ width: 18, height: 8 }}>
          <img
            src="/logo/normalLogo.png"
            alt="LOGO"
            style={{
              height: "4rem",
              width: "15rem",
            }}
          />
        </Box>
      </HeaderStyle>

      <Container>
        <Box sx={{ maxWidth: 480, mx: "auto", my: "6rem" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }} paragraph>
            Request sent successfully!
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            We've sent a 6-digit confirmation email to your email. Please enter
            the code in below box to verify your email.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Email"
                type="text"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
              <TextField
                label="Password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                type={showPassword ? "text" : "password"}
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
                }}
              />
              <TextField
                label="Confirm Password"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack
                direction="row"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {[1, 2, 3, 4, 5, 6].map((digit) => (
                  <Controller
                    key={digit}
                    name={`digit${digit}`}
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="text"
                        variant="outlined"
                        inputProps={{
                          maxLength: 1,
                        }}
                        error={Boolean(fieldState?.error)}
                        helperText={fieldState?.error?.message}
                        sx={{ width: "3.5rem" }}
                        placeholder="-"
                      />
                    )}
                  />
                ))}
              </Stack>
            </Stack>
            <Button fullWidth variant="contained" sx={{ my: 2 }} type="submit">
              {isLoading ? <CircularProgress /> : "Reset Password"}
            </Button>
          </form>

          <Button
            fullWidth
            size="large"
            onClick={() => navigate("/auth/forgot-password")}
            sx={{ mt: 1 }}
          >
            Back
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default ResetPassword;
