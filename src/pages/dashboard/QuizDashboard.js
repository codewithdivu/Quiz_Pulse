import React, { useEffect, useState } from "react";
import McqQuestion from "../../sections/questions/McqQuestion";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { apiRouter, axiosGet } from "../../services";
import { useNavigate } from "react-router-dom";

const QuizDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axiosGet(apiRouter.GET_QUIZ_LIST);
        setQuizzes(response?.data?.data);
      } catch (error) {
        console.log("error :>> ", error);
      }
    };

    fetchQuiz();
  }, []);

  const handleQuiz = (quizId) => {
    navigate(`/dashboard/test/${quizId}`);
  };

  return (
    <Container>
      <Grid container spacing={3} sx={{ marginTop: "2rem" }}>
        {quizzes &&
          quizzes?.length > 0 &&
          quizzes?.map((quiz, index) => (
            <Grid item xs={12} sm={12} md={4} key={index}>
              <Card
                onClick={() => handleQuiz(quiz?._id)}
                sx={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {quiz?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {quiz?.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {quiz?.duration} minutes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default QuizDashboard;
