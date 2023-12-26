import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateQuestion = () => {
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
  const defaultValues = {
    type: "",
    difficultyLevel: "",
    category: "",
    tags: [],
    description: "",
    points: 0,
    question: {
      type: "",
      text: "",
    },
    correct_answer: "",
    options: [{ type: "", text: "" }],
  };

  const {
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

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <Box sx={{ marginTop: "5rem" }}>
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
                <MenuItem value="image">Image</MenuItem>
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
                <MenuItem value="easy">hr</MenuItem>
                <MenuItem value="medium">sdf</MenuItem>
                <MenuItem value="hard">sdfsd</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tags</InputLabel>
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      multiple
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
                <MenuItem value="image">Image</MenuItem>
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
                    <MenuItem value="image">Image</MenuItem>
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
                Create Question
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateQuestion;
