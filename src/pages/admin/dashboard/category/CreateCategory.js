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
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../../../../hooks/useAuth";
import {
  apiRouter,
  axiosGet,
  axiosPost,
  axiosPatch,
} from "../../../../services";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes("edit");
  const [currentCategory, setCurrentCategory] = useState();

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsFetching(true);
      if (id && isEdit) {
        try {
          const res = await axiosGet(apiRouter.GET_CATEGORY.replace(":id", id));
          setCurrentCategory(res?.data?.data);
          setIsFetching(false);
        } catch (error) {
          console.log("error :>> ", error);
          setIsFetching(false);
        }
      }
      setIsFetching(false);
    };
    fetchCategory();
  }, [isEdit]);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCategory?.name || "",
      description: currentCategory?.description || "",
    }),
    [isEdit, currentCategory, id]
  );

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
    if (isEdit) {
      try {
        const response = await axiosPatch(
          apiRouter.UPDATE_CATEGORY.replace(":id", id),
          {
            ...data,
          }
        );
        reset();
        navigate("/admin/category/list");
        setIsLoading(false);
      } catch (error) {
        console.log("categoryCreateError :>> ", error);
        setIsLoading(false);
      }
      return;
    }
    try {
      const response = await axiosPost(apiRouter.CREATE_CATEGORY, {
        ...data,
        createdBy: user?._id,
      });
      reset();
      setIsLoading(false);
      navigate("/admin/category/list");
    } catch (error) {
      console.log("categoryCreateError :>> ", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isEdit) {
      reset({ ...defaultValues });
    } else {
      reset({ ...defaultValues });
    }
  }, [isEdit, defaultValues]);

  return (
    <Container>
      <Box sx={{ marginTop: "6rem" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {isEdit ? "Category Updation" : "Category Creation"}
        </Typography>
        <Stack spacing={2} sx={{ marginTop: "1rem" }}>
          <Breadcrumbs separator="-" aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit">
              Category
            </Link>
            <Typography key="3" color="text.primary">
              {isEdit ? "Update" : "create"}
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
        {isFetching ? (
          <CircularProgress size="large" />
        ) : (
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
                  ) : isEdit ? (
                    "Update Category"
                  ) : (
                    "Create Category"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default CreateCategory;
