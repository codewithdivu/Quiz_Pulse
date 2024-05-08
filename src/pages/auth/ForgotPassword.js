import { yupResolver } from "@hookform/resolvers/yup";
import {
  styled,
  Box,
  Typography,
  Container,
  Stack,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
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

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email address")
      .required("Email is required")
      .trim("Enter valid email address"),
  });

  const defaultValues = {
    email: "",
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
    console.log("forgot-data :>> ", data);
    setIsLoading(true);
    try {
      const response = await axiosPost(apiRouter.FORGOT_PASSWORD, { ...data });
      if (response.status === 404) {
        setIsLoading(false);
        reset();
        return alert("There is no user with this email...");
      }
      localStorage.setItem("email", data?.email);
      setIsLoading(false);
      navigate("/auth/reset-password");
    } catch (error) {
      console.log("forgot-password-error :>> ", error);
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
        </Box>{" "}
      </HeaderStyle>

      <Container>
        <Box sx={{ maxWidth: 480, mx: "auto", my: "6rem" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }} paragraph>
            Forgot your password?
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
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
            </Stack>
            <Button fullWidth variant="contained" sx={{ my: 2 }} type="submit">
              {isLoading ? <CircularProgress /> : "Forgot Password"}
            </Button>
          </form>

          <Button
            fullWidth
            size="large"
            onClick={() => navigate("/auth/login")}
            sx={{ mt: 1 }}
          >
            Back
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default ForgotPassword;
