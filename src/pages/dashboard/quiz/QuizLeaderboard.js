import React, { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  Container,
  Stack,
  Avatar,
} from "@mui/material";
import { Chart } from "react-google-charts";
import { axiosGet } from "../../../services/axios.config";
import { apiRouter } from "../../../services/apisRouter.";

const QuizLeaderboard = () => {
  const [graphType, setGraphType] = useState("BarChart");
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const handleGraphTypeChange = (event) => {
    setGraphType(event.target.value);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosGet(apiRouter.GET_QUIZ_LIST);
        setQuizzes(response?.data?.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosGet(apiRouter.GET_ALL_USERS);
        setUsers(response?.data?.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchScores = async () => {
      try {
        const response = await axiosGet(apiRouter.GET_ALL_SCORE);
        setScores(response?.data?.data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    const fetchFeedback = async () => {
      try {
        const response = await axiosGet(apiRouter.GET_ALL_FEEDBACK);
        setFeedback(response?.data?.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchQuizzes();
    fetchUsers();
    fetchScores();
    fetchFeedback();
  }, []);

  useEffect(() => {
    if (
      quizzes.length > 0 &&
      users.length > 0 &&
      scores.length > 0 &&
      feedback.length > 0
    ) {
      const combinedData = [];

      users.forEach((user) => {
        quizzes.forEach((quiz) => {
          const userScore = scores.find(
            (score) => score.userId === user._id && score.quizId === quiz._id
          );
          const userFeedback = feedback.find(
            (fb) => fb.userId === user._id && fb.quizId === quiz._id
          );

          const combinedEntry = {
            userId: user._id,
            userName: user.username,
            userProfilePic: user.profile_pic,
            quizId: quiz._id,
            quizTitle: quiz.title,
            score: userScore ? userScore.score : 0,
            maxScore: userScore ? userScore.maxScore : 0,
            percentage: userScore ? userScore.percentage : 0,
            rating: userFeedback ? userFeedback.rating : "null",
            comment: userFeedback
              ? userFeedback.comments
              : "Not given feedback",
          };

          combinedData.push(combinedEntry);
        });
      });

      setLeaderboardData(combinedData);
    }
  }, [quizzes, users, scores, feedback]);

  return (
    <Container>
      <div
        style={{
          marginBottom: "1rem",
          marginTop: "2rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Select Graph Type:
        </Typography>
        <Select value={graphType} onChange={handleGraphTypeChange}>
          <MenuItem value="BarChart">Bar Chart</MenuItem>
          <MenuItem value="LineChart">Line Chart</MenuItem>
          <MenuItem value="PieChart">Pie Chart</MenuItem>
          <MenuItem value="AreaChart">Area Chart</MenuItem>
        </Select>
      </div>
      {quizzes.map((quiz) => (
        <Card key={quiz._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {quiz.title} Leaderboard
            </Typography>
            {graphType === "BarChart" && (
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["User", "Score"],
                  ...leaderboardData
                    .filter((entry) => entry.quizId === quiz._id)
                    .map((entry) => [entry.userName, entry.score]),
                ]}
                options={{
                  title: "Top Scorers",
                  hAxis: {
                    title: "Score",
                  },
                  vAxis: {
                    title: "User",
                  },
                }}
              />
            )}
            {graphType === "LineChart" && (
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["User", "Score"],
                  ...leaderboardData
                    .filter((entry) => entry.quizId === quiz._id)
                    .map((entry) => [entry.userName, entry.score]),
                ]}
                options={{
                  title: "Top Scorers",
                  hAxis: {
                    title: "Score",
                  },
                  vAxis: {
                    title: "User",
                  },
                }}
              />
            )}
            {graphType === "PieChart" && (
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["User", "Score"],
                  ...leaderboardData
                    .filter((entry) => entry.quizId === quiz._id)
                    .map((entry) => [entry.userName, entry.score]),
                ]}
                options={{
                  title: "Top Scorers",
                }}
              />
            )}
            {graphType === "AreaChart" && (
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["User", "Score"],
                  ...leaderboardData
                    .filter((entry) => entry.quizId === quiz._id)
                    .map((entry) => [entry.userName, entry.score]),
                ]}
                options={{
                  title: "Top Scorers",
                  hAxis: {
                    title: "Score",
                  },
                  vAxis: {
                    title: "User",
                  },
                }}
              />
            )}
            <Paper elevation={3} sx={{ marginTop: "1rem", padding: "1rem" }}>
              <TableContainer sx={{ maxHeight: 200, overflow: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Max Score</TableCell>
                      <TableCell>Percentage</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Comment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaderboardData
                      .filter((entry) => entry.quizId === quiz._id)
                      .map((entry) => (
                        <TableRow key={`${entry.userId}-${entry.quizId}`}>
                          <TableCell>
                            <Stack
                              direction="row"
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Avatar
                                alt={entry?.userName}
                                src={entry?.userProfilePic}
                                sx={{ width: 32, height: 32 }}
                              />
                              <Typography sx={{ marginLeft: "0.5rem" }}>
                                {entry?.userName}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell>{entry.score}</TableCell>
                          <TableCell>{entry.maxScore}</TableCell>
                          <TableCell>{entry.percentage}%</TableCell>
                          <TableCell>{entry.rating}</TableCell>
                          <TableCell>{entry.comment}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default QuizLeaderboard;
