import React from "react";
import McqQuestion from "../../sections/questions/McqQuestion";
import { Button, Container, Stack } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const QuizDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  console.log("userDashboard :>> ", user);
  console.log("isAuthenticated :>> ", isAuthenticated);

  const question = {
    _id: "239847rsdfhk",
    question: {
      type: "text",
      text: "who is the father of androidsdfjalsjdflasdlfja aldfjalsdjf calsdjfalj aljdfal jfalsj?",
      imageUrl: "/logo/normalLogo.png",
    },
    options: [
      {
        type: "text",
        text: "Andy Ruby",
      },
      {
        type: "text",
        text: "divyesh",
      },
      {
        type: "text",
        text: "Hemant",
      },
      {
        type: "text",
        text: "google bhai",
      },
    ],
  };
  return (
    <Container>
      <h1>Quiz Dashboard</h1>
      <McqQuestion question={question} />
      <Stack direction="row-reverse">
        <Button
          variant="contained"
          sx={{
            width: "11rem",
            padding: "0.5rem",
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
};

export default QuizDashboard;
