import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../../../../hooks/useAuth";
import { apiRouter, axiosPost } from "../../../../services";

const CreateCategory = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
  });

  const defaultValues = {
    name: "",
    description: "",
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
      const response = await axiosPost(apiRouter.CREATE_CATEGORY, {
        ...data,
        createdBy: user?._id,
      });
      reset();
      setIsLoading(false);
    } catch (error) {
      console.log("categoryCreateError :>> ", error);
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Box sx={{ marginTop: "6rem" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Category Creation
        </Typography>
        <Stack spacing={2} sx={{ marginTop: "1rem" }}>
          <Breadcrumbs separator="-" aria-label="breadcrumb">
            <Link
              underline="hover"
              key="1"
              color="inherit"
            >
              Category
            </Link>
            <Typography key="3" color="text.primary">
              Create
            </Typography>
            ,{" "}
          </Breadcrumbs>
        </Stack>
      </Box>
      <Box
        sx={{
          marginTop: "5rem",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                label="Name"
                type="text"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                label="Description"
                type="text"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button type="submit" fullWidth variant="contained">
                {isLoading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "Create Category"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateCategory;
