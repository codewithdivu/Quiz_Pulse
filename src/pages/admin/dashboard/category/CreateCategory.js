import { Box, Button, Container, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CreateCategory = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
  });

  const defaultValues = {
    name: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <Box sx={{ marginTop: "12rem" }}>
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
                Create Category
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateCategory;
