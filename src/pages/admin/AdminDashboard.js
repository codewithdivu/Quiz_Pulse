import { Container, Grid, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppWelcome from "../../sections/dashboard/AppWelcome";
import AppWidgetSummary from "../../sections/dashboard/AppWidgetSummary";
import { apiRouter, axiosGet } from "../../services";

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axiosGet(apiRouter.GET_CATEGORY_LIST);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchQuestions = async () => {
      try {
        const questionsResponse = await axiosGet(apiRouter.GET_QUESTION_LIST);
        setQuestions(questionsResponse.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    const fetchQuizzes = async () => {
      try {
        const quizzesResponse = await axiosGet(apiRouter.GET_QUIZ_LIST);
        setQuizzes(quizzesResponse.data.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    const fetchUsers = async () => {
      try {
        const usersResponse = await axiosGet(apiRouter.GET_ALL_USERS);
        setUsers(usersResponse.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchCategories();
    fetchQuestions();
    fetchQuizzes();
    fetchUsers();
  }, []);

  return (
    <Container>
      <Grid container spacing={3} sx={{ marginTop: "2rem" }}>
        <Grid item xs={12} md={12}>
          <AppWelcome />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Users"
            percent={-0.1}
            total={users?.length || 0}
            chartColor={"red"}
            chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Quiz"
            percent={-0.1}
            total={quizzes?.length || 0}
            chartColor={"red"}
            chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Questions"
            percent={-0.1}
            total={questions?.length || 0}
            chartColor={"red"}
            chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Categories"
            percent={-0.1}
            total={categories?.length || 0}
            chartColor={"red"}
            chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
