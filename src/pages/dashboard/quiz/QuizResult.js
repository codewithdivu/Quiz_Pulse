import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";
import { apiRouter, axiosPost } from "../../../services";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ScoreIcon from "@mui/icons-material/Score";
import FeedbackModal from "../../../components/models/FeedbackModel";

const QuizResult = () => {
  const { userId, quizId } = useParams();
  const [resultData, setResultData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  useEffect(() => {
    const fetchScore = async () => {
      setIsLoading(true);
      if (userId && quizId) {
        try {
          const response = await axiosPost(
            apiRouter.GET_SCORE.replace(":quizId", quizId).replace(
              ":userId",
              userId
            ),
            {
              userId,
              quizId,
            }
          );
          setResultData(response?.data?.data);
          setIsLoading(false);
          console.log("response :>> ", response);
        } catch (error) {
          console.log("error :>> ", error);
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    };
    const showFeedbackModalAfterDelay = () => {
      setTimeout(() => {
        setShowFeedbackModal(true);
      }, 10000);
    };
    fetchScore();
    showFeedbackModalAfterDelay();
  }, [userId, quizId]);

  const handleFeedbackSubmit = async (data) => {
    try {
      if (data?.ratings == "" || data?.comments == "") {
        return alert("please kindly submit the feedback");
      }
      const res = await axiosPost(apiRouter.SUBMIT_FEEDBACK, {
        ...data,
        userId,
        quizId,
      });
      setShowFeedbackModal(false);
    } catch (error) {
      console.log("error :>> ", error);
      setIsFeedbackSubmitting(false);
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Result Charts
        </Typography>
      </Box>

      {isLoading ? (
        <CircularProgress size="large" />
      ) : resultData && Object.keys(resultData).length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Card sx={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  display="flex"
                  alignItems="center"
                >
                  <AssessmentIcon fontSize="large" />
                  <span style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                    Score:{" "}
                  </span>{" "}
                  {resultData?.score}
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  display="flex"
                  alignItems="center"
                >
                  <ScoreIcon fontSize="large" />
                  <span style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                    Max Score:{" "}
                  </span>
                  {resultData?.maxScore}
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  display="flex"
                  alignItems="center"
                >
                  <AssessmentIcon fontSize="large" />
                  <span style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                    Percentage:{" "}
                  </span>
                  {resultData?.percentage}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Bar Chart
              </Typography>
              <Chart
                width={"100%"}
                height={"200px"}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Task", "Result"],
                  ["Score", resultData.score],
                  ["Max Score", resultData.maxScore],
                ]}
                options={{
                  title: "Bar Chart",
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Pie Chart
              </Typography>
              <Chart
                width={"100%"}
                height={"200px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Task", "Result"],
                  ["Score", resultData.score],
                  ["Remaining", resultData.maxScore - resultData.score],
                ]}
                options={{
                  title: "Pie Chart",
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Line Chart
              </Typography>
              <Chart
                width={"100%"}
                height={"200px"}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Task", "Result"],
                  ["Score", resultData.score],
                  ["Max Score", resultData.maxScore],
                ]}
                options={{
                  title: "Line Chart",
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Area Chart
              </Typography>
              <Chart
                width={"100%"}
                height={"200px"}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Task", "Result"],
                  ["Score", resultData.score],
                  ["Max Score", resultData.maxScore],
                ]}
                options={{
                  title: "Area Chart",
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Donut Chart
              </Typography>
              <Chart
                width={"100%"}
                height={"200px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Task", "Result"],
                  ["Score", resultData.score],
                  ["Remaining", resultData.maxScore - resultData.score],
                ]}
                options={{
                  title: "Donut Chart",
                  pieHole: 0.4,
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary" align="center">
          No data available for charts.
        </Typography>
      )}

      <FeedbackModal
        open={showFeedbackModal}
        setOpen={setShowFeedbackModal}
        handleFeedbackSubmit={handleFeedbackSubmit}
        isFeedbackSubmitting={isFeedbackSubmitting}
      />
    </Container>
  );
};

export default QuizResult;
