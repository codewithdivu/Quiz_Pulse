import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "../../../../hooks/useAuth";
import {
  apiRouter,
  axiosGet,
  axiosPatch,
  axiosPost,
} from "../../../../services";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes("edit");
  const [currentQuestion, setCurrentQuestion] = useState();

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsFetching(true);
      if (id && isEdit) {
        try {
          const res = await axiosGet(apiRouter.GET_QUESTION.replace(":id", id));
          setCurrentQuestion(res?.data?.data);
          setIsFetching(false);
        } catch (error) {
          console.log("error :>> ", error);
          setIsFetching(false);
        }
      }
      setIsFetching(false);
    };
    fetchQuestion();
  }, [isEdit]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axiosGet(apiRouter.GET_CATEGORY_LIST);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const validationSchema = yup.object().shape({
    type: yup
      .string()
      .required("Type is required")
      .oneOf(["text", "image"], "Invalid type"),
    difficultyLevel: yup
      .string()
      .required("Difficulty level is required")
      .oneOf(["easy", "medium", "hard"], "Invalid difficulty level"),
    category: yup.string().required("Category is required"),
    tags: yup.array().of(yup.string().required("Tag is required")),
    description: yup.string().required("Description is required"),
    points: yup
      .number()
      .required("Points is required")
      .positive("Points must be a positive number"),
    question: yup.object().shape({
      type: yup
        .string()
        .required("Question type is required")
        .oneOf(["text", "image"], "Invalid question type"),
      text: yup.string().required("Question text is required"),
    }),
    correct_answer: yup.string().required("Correct answer is required"),
    options: yup.array().of(
      yup.object().shape({
        type: yup
          .string()
          .required("Option type is required")
          .oneOf(["text", "image"], "Invalid option type"),
        text: yup.string().required("Option text is required"),
      })
    ),
  });
  const defaultValues = useMemo(
    () => ({
      type: currentQuestion?.type || "",
      difficultyLevel: currentQuestion?.difficultyLevel || "",
      category: currentQuestion?.category || "",
      tags: currentQuestion?.tags || [],
      description: currentQuestion?.description || "",
      points: currentQuestion?.points || "",
      question: {
        type: currentQuestion?.question?.type || "",
        text: currentQuestion?.question?.text || "",
      },
      correct_answer: currentQuestion?.correct_answer || "",
      options: currentQuestion?.options || [{ type: "", text: "" }],
    }),
    [isEdit, currentQuestion, id]
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    if (isEdit) {
      try {
        const response = await axiosPatch(
          apiRouter.UPDATE_QUESTION.replace(":id", id),
          {
            ...data,
          }
        );
        reset();
        navigate("/admin/question/list");
        setIsLoading(false);
      } catch (error) {
        console.log("questionEditError :>> ", error);
        setIsLoading(false);
      }
      return;
    }
    try {
      const response = await axiosPost(apiRouter.CREATE_QUESTION, {
        ...data,
        createdBy: user?._id,
      });
      console.log("QuestionResponse :>> ", response);
      reset();
      setIsLoading(false);
      navigate("/admin/question/list");
    } catch (error) {
      console.log("questionCreateError :>> ", error);
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
          {isEdit ? "Question Updation" : "Question Creation"}{" "}
        </Typography>
        <Stack spacing={2} sx={{ marginTop: "1rem" }}>
          <Breadcrumbs separator="-" aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit">
              Question
            </Link>
            <Typography key="3" color="text.primary">
              {isEdit ? "Update" : "create"}
            </Typography>
            ,{" "}
          </Breadcrumbs>
        </Stack>
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Type"
                {...register("type")}
                error={!!errors.type}
                helperText={errors.type?.message}
                select
                fullWidth
                margin="normal"
              >
                <MenuItem value="text">Text</MenuItem>
                {/* <MenuItem value="image">Image</MenuItem> */}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Difficulty Level"
                {...register("difficultyLevel")}
                error={!!errors.difficultyLevel}
                helperText={errors.difficultyLevel?.message}
                select
                fullWidth
                margin="normal"
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Categories"
                {...register("category")}
                error={!!errors.category}
                helperText={errors.category?.message}
                select
                fullWidth
                margin="normal"
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      multiple
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tags"
                      error={!!errors.tags}
                      renderValue={(selected) => (
                        <div>
                          {selected.map((tag) => (
                            <Chip key={tag} label={tag} />
                          ))}
                        </div>
                      )}
                    >
                      <MenuItem value="javascript">JavaScript</MenuItem>
                      <MenuItem value="programming">Programming</MenuItem>
                    </Select>
                  )}
                />
                {errors.tags && (
                  <FormHelperText error>{errors.tags?.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}  

              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Points"
                type="number"
                {...register("points")}
                error={!!errors.points}
                helperText={errors.points?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}  

              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Question Type"
                {...register("question.type")}
                error={!!errors.question?.type}
                helperText={errors.question?.type?.message}
                select
                fullWidth
                margin="normal"
              >
                <MenuItem value="text">Text</MenuItem>
                {/* <MenuItem value="image">Image</MenuItem> */}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Question Text"
                {...register("question.text")}
                error={!!errors.question?.text}
                helperText={errors.question?.text?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}  

              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Correct Answer"
                {...register("correct_answer")}
                error={!!errors.correct_answer}
                helperText={errors.correct_answer?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}  

              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}></Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography>Options</Typography>
            </Grid>

            {fields.map((option, index) => (
              // <div key={option.id} style={{ marginBottom: "8px" }}>
              <>
                <Grid item xs={12} sm={12} md={5.5}>
                  <TextField
                    label={`Option ${index + 1} Type`}
                    {...register(`options.${index}.type`)}
                    error={!!errors?.options?.[index]?.type}
                    helperText={errors?.options?.[index]?.type?.message}
                    select
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="text">Text</MenuItem>
                    {/* <MenuItem value="image">Image</MenuItem> */}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={5.5}>
                  <TextField
                    label={`Option ${index + 1} Text`}
                    {...register(`options.${index}.text`)}
                    error={!!errors?.options?.[index]?.text}
                    helperText={errors?.options?.[index]?.text?.message}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={1}>
                  <IconButton
                    onClick={() => remove(index)}
                    sx={{ marginTop: "1rem" }}
                  >
                    <DeleteIcon sx={{ fill: "red" }} fontSize="large" />
                  </IconButton>
                </Grid>
              </>

              // </div>
            ))}

            <Grid item xs={12} sm={12} md={6}>
              <Button
                type="button"
                variant="contained"
                onClick={() => append({ type: "text", text: "" })}
              >
                Add Option
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6}></Grid>
            <Grid item xs={12} sm={12} md={6}></Grid>
            <Grid item xs={12} sm={12} md={6}></Grid>
            <Grid item xs={12} sm={12} md={6}></Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button type="submit" fullWidth variant="contained">
                {isLoading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : isEdit ? (
                  "Update Question"
                ) : (
                  "Create Question"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateQuestion;
