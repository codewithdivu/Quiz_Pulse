import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Grid,
  styled,
  CircularProgress,
  Input,
  InputLabel,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../../hooks/useAuth";
import { apiRouter, axiosPatch, axiosPost } from "../../../services";
import axios from "axios";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 20,
});

const StyledInput = styled(Input)({
  display: "none",
});

const StyledCircle = styled("div")({
  borderRadius: "50%",
  overflow: "hidden",
  width: 150,
  height: 150,
  position: "relative",
  backgroundColor: "#eee",
  cursor: "pointer",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, updateUser } = useAuth();

  useEffect(() => {
    if (user?.profile_pic) {
      setSelectedFile(user?.profile_pic);
    }
  }, [user]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileSize = file.size / 1024 / 1024;

      if (
        (file.type === "image/png" || file.type === "image/jpeg") &&
        fileSize <= 2
      ) {
        setLoading(true);
        setTimeout(() => {
          //   setSelectedFile(URL.createObjectURL(file));
          setSelectedFile(file);
          setLoading(false);
        }, 1000);
      } else {
        alert("Please upload a PNG or JPG image file less than 2 MB.");
        event.target.value = null;
        setSelectedFile(null);
      }
    }
  };

  const handleCircleClick = () => {
    document.getElementById("profilePic").click();
  };

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email"),
    // .required("Email is required"),
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters"),
    // .required("Username is required"),
    phoneNumber: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .nullable(),
    firstname: yup.string().max(20, "Firstname must not exceed 20 characters"),
    lastname: yup.string().max(20, "Lastname must not exceed 20 characters"),
  });

  const defaultValues = useMemo(
    () => ({
      email: user?.email || "",
      username: user?.username || "",
      phoneNumber: user?.phoneNumber || "",
      firstname: user?.firstName || "",
      lastname: user?.lastName || "",
    }),
    [user]
  );

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const { email, username, phoneNumber, firstname, lastname } = data;
    try {
      const formData = new FormData();
      formData.append("profilePic", selectedFile);
      const imageRes = await axiosPost(
        apiRouter.UPLOAD_PROFILE_PIC,
        formData,
        "multipart/form-data"
      );
      console.log("imageRes :>> ", imageRes);
      setSelectedFile(imageRes?.data?.data);

      const res = await axiosPatch(
        apiRouter.UPDATE_USER_PROFILE.replace(":id", user?._id),
        {
          id: user?._id,
          email,
          username,
          phoneNumber,
          firstName: firstname,
          lastName: lastname,
          profile_pic: imageRes?.data?.data,
        },
        {
          id: user?._id,
        }
      );
      console.log("res :>> ", res);
      setIsSubmitting(false);
    } catch (error) {
      console.log("error :>> ", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12} sm={12} md={12}>
            <StyledContainer>
              <InputLabel required>Profile Picture</InputLabel>
              <StyledCircle onClick={handleCircleClick}>
                {loading ? (
                  <CircularProgress
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ) : (
                  selectedFile && (
                    <StyledImage src={selectedFile} alt="Preview" />
                  )
                )}
              </StyledCircle>
              <StyledInput
                id="profilePic"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </StyledContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="Email"
              type="text"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="Username"
              type="text"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="Phone Number"
              type="number"
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="First Name"
              type="text"
              {...register("firstname")}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="Last Name"
              type="text"
              {...register("lastname")}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isSubmitting ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Update Profile"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Profile;
