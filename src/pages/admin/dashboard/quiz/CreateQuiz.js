import React from "react";
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
} from "@mui/material";

const questions = ["Question 1", "Question 2", "Question 3"]; // Replace with your actual questions

const CreateQuiz = () => {
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Box sx={{ marginTop: "12rem" }}>
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
              <FormControl fullWidth margin="normal">
                {/* <InputLabel>Questions</InputLabel> */}
                {questions.map((question, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        {...register(`questions[${index}]`)}
                        value={question}
                      />
                    }
                    label={question}
                  />
                ))}
                {errors.questions && <div>{errors.questions.message}</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create Quiz
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateQuiz;
