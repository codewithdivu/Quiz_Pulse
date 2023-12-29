import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRouter, axiosGet, axiosPost } from "../../../services";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import McqQuestion from "../../../sections/questions/McqQuestion";
import useAuth from "../../../hooks/useAuth";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quizData, setQuizData] = useState();
  const [count, setCount] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [lastQuestion, setLastQuestion] = useState();
  // loader
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [isQuestionSubmitting, setIsQuestionSubmitting] = useState(false);
  // question answer
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      if (quizId) {
        try {
          const response = await axiosGet(
            apiRouter.GET_QUIZ.replace(":id", quizId)
          );
          setQuizData(response.data.data);
          setLastQuestion(response?.data?.data?.questions?.length);
          setIsLoading(false);
        } catch (error) {
          console.log("error :>> ", error);
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsQuestionLoading(true);
      if (quizData?.questions.length > 0) {
        try {
          const eachQuestionResponse = await axiosGet(
            apiRouter.GET_QUESTION.replace(
              ":id",
              quizData?.questions[count - 1]
            )
          );
          setCurrentQuestion(eachQuestionResponse?.data?.data);
          setIsQuestionLoading(false);
        } catch (error) {
          console.log("error :>> ", error);
          setIsQuestionLoading(false);
        }
      }
      setIsQuestionLoading(false);
    };
    fetchQuestion();
  }, [quizData, count]);

  const handleSubmitQuestion = async () => {
    if (!selectedOption) {
      return alert("please select any one one option");
    }

    const correctAnswer = quizData?.correct_answer;
    const isCorrect = selectedOption === correctAnswer;
    const selectedAnswer = selectedOption;
    const questionId = quizData?.questions[count - 1];
    const userId = user?._id;

    try {
      const res = await axiosPost(
        apiRouter.SUBMIT_QUESTION.replace(
          ":questionId",
          quizData?.questions[count - 1]
        ),
        {
          userId,
          quizId,
          questionId,
          selectedAnswer,
          isCorrect,
        }
      );
    } catch (error) {
      console.log("error :>> ", error);
    }

    if (lastQuestion === count) {
      // final submit api call
      try {
        const finalRes = await axiosPost(
          apiRouter.FINAL_QUIZ_SUBMIT.replace(":quizId", quizId).replace(
            ":userId",
            userId
          ),
          {
            userId,
            quizId,
          }
        );
        navigate(`/dashboard/test/${quizId}/${userId}`);
      } catch (error) {
        console.log("finalSubmiterror :>> ", error);
      }
      return;
    }

    setCount((prev) => prev + 1);
    setSelectedOption(null);
  };

  return (
    <Container>
      {isLoading ? (
        <CircularProgress size="large" />
      ) : (
        <>
          <Box sx={{ marginTop: "2rem" }}>
            <Stack
              direction="row"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {quizData?.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Question {count}/{quizData?.questions?.length}
              </Typography>
            </Stack>
          </Box>
          {isQuestionLoading ? (
            <CircularProgress size="large" />
          ) : (
            <McqQuestion
              question={currentQuestion}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
            />
          )}
          <Stack direction="row-reverse">
            <Button
              variant="contained"
              sx={{
                width: "11rem",
                padding: "0.5rem",
                textTransform: "none",
                fontSize: "1rem",
              }}
              onClick={handleSubmitQuestion}
            >
              {isQuestionSubmitting ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : lastQuestion === count ? (
                "Submit Quiz"
              ) : (
                "Next"
              )}
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default QuizPage;
