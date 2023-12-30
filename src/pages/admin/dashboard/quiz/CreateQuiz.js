import React, { useEffect, useMemo, useState } from "react";
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
  duration,
} from "@mui/material";
import {
  apiRouter,
  axiosGet,
  axiosPatch,
  axiosPost,
} from "../../../../services";
import useAuth from "../../../../hooks/useAuth";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes("edit");
  const [currentQuiz, setCurrentQuiz] = useState();

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isQuestionsFetching, setIsQuestionsFetching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState();

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsFetching(true);
      if (id && isEdit) {
        try {
          const res = await axiosGet(apiRouter.GET_QUIZ.replace(":id", id));
          setCurrentQuiz(res?.data?.data);
          setIsFetching(false);
        } catch (error) {
          console.log("error :>> ", error);
          setIsFetching(false);
        }
      }
      setIsFetching(false);
    };
    fetchQuiz();
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

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsQuestionsFetching(true);
      try {
        const questionsResponse = await axiosGet(apiRouter.GET_QUESTION_LIST);
        if (!choosenCategory) {
          setFetchedQuestions(questionsResponse.data.data);
          setIsQuestionsFetching(false);
        } else {
          const filteredQuestions =
            choosenCategory &&
            questionsResponse?.data?.data?.filter(
              (item) => item?.category === choosenCategory
            );
          setFetchedQuestions(filteredQuestions);
          setIsQuestionsFetching(false);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsQuestionsFetching(false);
      }
      setIsQuestionsFetching(false);
    };
    fetchQuestions();
  }, [choosenCategory]);

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

  const defaultValues = useMemo(
    () => ({
      title: currentQuiz?.title || "",
      description: currentQuiz?.description || "",
      difficultyLevel: currentQuiz?.difficultyLevel || "",
      questions: currentQuiz?.questions || [],
      duration: currentQuiz?.duration || 0,
      isActive: currentQuiz?.isActive || false,
    }),
    [isEdit, currentQuiz, id]
  );

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
    if (isEdit) {
      try {
        const response = await axiosPatch(
          apiRouter.UPDATE_QUIZ.replace(":id", id),
          {
            title,
            description,
            difficultyLevel,
            questions: [...filteredQuestions],
            duration,
            isActive,
          }
        );
        reset();
        navigate("/admin/quiz/list");
        setIsLoading(false);
      } catch (error) {
        console.log("categoryCreateError :>> ", error);
        setIsLoading(false);
      }
      return;
    }
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
      navigate("/admin/quiz/list");
    } catch (error) {
      console.log("quizCreateError :>> ", error);
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
          {isEdit ? "Quiz Updation" : "Quiz Creation"}{" "}
        </Typography>
        <Stack spacing={2} sx={{ marginTop: "1rem" }}>
          <Breadcrumbs separator="-" aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit">
              Quiz
            </Link>
            <Typography key="3" color="text.primary">
              {isEdit ? "Update" : "create"}
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
              <TextField
                label="Categories"
                select
                fullWidth
                margin="normal"
                value={choosenCategory}
                onChange={(e) => setChoosenCategory(e.target.value)}
              >
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
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
              {isQuestionsFetching ? (
                <CircularProgress size="large" />
              ) : (
                <Paper
                  elevation={3}
                  style={{ maxHeight: 250, overflowY: "auto", padding: 16 }}
                >
                  <InputLabel>Questions</InputLabel>
                  <FormControl fullWidth margin="normal">
                    {fetchedQuestions?.map((question, index) => (
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
              )}
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
                ) : isEdit ? (
                  "Update Quiz"
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
