import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
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
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../services/axios";
import { apiRouter } from "../../services/apisRouter.";
import useAuth from "../../hooks/useAuth";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

const AdminLogin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

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
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await login({ ...data });
      setIsLoading(false);
      navigate("/admin");
      reset();
    } catch (error) {
      console.log("loginErrors :>> ", error);
      setIsLoading(false);
    }
  };

  return (
    <RootStyle>
      <HeaderStyle>
        <Box sx={{ width: 8, height: 8 }}>
          {/* <img src="/logo/normalLogo.png" alt="LOGO" /> */}
        </Box>
      </HeaderStyle>

      {mdUp && (
        <SectionStyle>
          <Typography
            variant="h4"
            sx={{ px: 5, mt: 10, mb: 5, fontWeight: "bold" }}
          >
            Hi, ADMIN
          </Typography>
          <img
            alt="login"
            src="https://minimals.cc/assets/illustrations/illustration_dashboard.png"
          />
        </SectionStyle>
      )}

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
                Sign in to Admin panel of Quiz Pulse
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enter your details below.
              </Typography>
            </Box>
          </Stack>

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
            </Stack>

            <Button fullWidth variant="contained" sx={{ my: 2 }} type="submit">
              {isLoading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default AdminLogin;
