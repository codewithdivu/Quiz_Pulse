import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  Container,
  Grid,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Stack,
  Breadcrumbs,
} from "@mui/material";
import { apiRouter, axiosGet, axiosPost } from "../../../../services";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router-dom";

const questions = ["Question 1", "Question 2", "Question 3"]; // Replace with your actual questions

const CreateQuiz = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  // console.log("fetchedQuestions :>> ", fetchedQuestions);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsResponse = await axiosGet(apiRouter.GET_QUESTION_LIST);
        setFetchedQuestions(questionsResponse.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    difficultyLevel: yup.string().required("Difficulty level is required"),
    questions: yup
      .array()
      .of(yup.string())
      .min(1, "Select at least one question"),
    description: yup.string().required("Description is required"),
    duration: yup
      .number()
      .required("Duration is required")
      .positive("Duration must be a positive number"),
    isActive: yup.boolean().required("isActive is required"),
  });

  const defaultValues = {
    title: "",
    description: "",
    difficultyLevel: "",
    questions: [],
    duration: 0,
    isActive: false,
  };

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (data) => {
    console.log(data);
    const {
      title,
      description,
      difficultyLevel,
      questions,
      duration,
      isActive,
    } = data;

    const filteredQuestions = questions?.filter((item) => item !== "false");

    setIsLoading(true);
    try {
      const response = await axiosPost(apiRouter.CREATE_QUIZ, {
        title,
        description,
        difficultyLevel,
        questions: [...filteredQuestions],
        duration,
        isActive,
        createdBy: user?._id,
      });
      console.log("QuizResponse :>> ", response);
      reset();
      setIsLoading(false);
    } catch (error) {
      console.log("quizCreateError :>> ", error);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: "6rem" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Question Creation
        </Typography>
        <Stack spacing={2} sx={{ marginTop: "1rem" }}>
          <Breadcrumbs separator="-" aria-label="breadcrumb">
            <Link
              underline="hover"
              key="1"
              color="inherit"
            >
              Question
            </Link>
            <Typography key="3" color="text.primary">
              Create
            </Typography>
            ,{" "}
          </Breadcrumbs>
        </Stack>
      </Box>
      <Box sx={{ marginTop: "5rem" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Difficulty Level</InputLabel>
                <Select
                  {...register("difficultyLevel")}
                  error={!!errors.difficultyLevel}
                  defaultValue=""
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
                {errors.difficultyLevel && (
                  <div>{errors.difficultyLevel.message}</div>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Duration"
                type="number"
                {...register("duration")}
                error={!!errors.duration}
                helperText={errors.duration?.message}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControlLabel
                control={
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(e) => setValue("isActive", e.target.checked)}
                      />
                    )}
                  />
                }
                label="Is Active"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Paper
                elevation={3}
                style={{ maxHeight: 250, overflowY: "auto", padding: 16 }}
              >
                <FormControl fullWidth margin="normal">
                  {/* <InputLabel>Questions</InputLabel> */}
                  {fetchedQuestions.map((question, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          {...register(`questions[${index}]`)}
                          value={question?._id}
                        />
                      }
                      label={question?.question?.text}
                    />
                  ))}
                  {errors.questions && <div>{errors.questions.message}</div>}
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "Create Quiz"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateQuiz;
