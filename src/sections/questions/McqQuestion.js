import {
  Box,
  Grid,
  Stack,
  Paper,
  styled,
  Typography,
  RadioGroup,
  FormControl,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import OptionContainer from "./OptionContainer";

const Question = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  width: "70vw",
}));
function McqQuestion({ question, selectedOption, handleOptionChange }) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Question>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ p: 4, marginTop: "2rem" }}>
              <Typography variant="h6">{question?.question?.text}</Typography>
              {question?.question?.type === "image" && (
                <Box
                  sx={{
                    height: "150px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    alt="question"
                    src={question?.imageUrl}
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              {question?.question?.type === "text" && (
                <Box className="flex center">
                  <Typography variant="body2" paragraph>
                    {question?.description}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{ marginTop: md ? "0" : "1.4rem" }}
          >
            <Box sx={{ p: 4 }}>
              <Typography variant="body1">Select Any One</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={question?._id}
                  name={question?._id}
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  {question?.options?.map((option, index) => (
                    <OptionContainer
                      key={index}
                      option={option}
                      index={index}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Question>
    </Container>
  );
}

export default McqQuestion;
