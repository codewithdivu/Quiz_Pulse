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

const Register = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: userRegister } = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters")
      .required("Username is required"),
    email: yup
      .string()
      .email("Email must be a valid email address")
      .required("Email is required")
      .trim()
      .max(255, "Email must not exceed 255 characters"),
    password: yup
      .string()
      .required("Password is required")
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long"
      ),
  });

  const defaultValues = {
    username: "",
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
    console.log("dataRegister :>> ", data);
    setIsLoading(true);
    try {
      const res = await userRegister(data);
      setIsLoading(false);
      navigate("/auth");
      reset();
    } catch (error) {
      console.log("registerErrors :>> ", error);
      setIsLoading(false);
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
        {smUp && (
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have account?{" "}
            <Link variant="subtitle2" component={Link} to={"/auth/login"}>
              Get started
            </Link>
          </Typography>
        )}
      </HeaderStyle>

      {mdUp && (
        <SectionStyle>
          <Typography
            variant="h4"
            sx={{ px: 5, mt: 10, mb: 5, fontWeight: "bold" }}
          >
            Hi, Register here
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
                Register in to Quiz Pulse
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enter your details below.
              </Typography>
            </Box>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Username"
                type="text"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                fullWidth
              />
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
                "Register"
              )}
            </Button>
          </form>

          {!smUp && (
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have account?{" "}
              <Link variant="subtitle2" component={Link} to={"/auth/login"}>
                Get started
              </Link>
            </Typography>
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Register;
