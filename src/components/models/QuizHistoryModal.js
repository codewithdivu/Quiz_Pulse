import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Chart } from "react-google-charts";
import { apiRouter, axiosGet } from "../../services";

const QuizHistoryModal = ({ open, handleClose, quizHistory }) => {
  const [quizDetails, setQuizDetails] = useState([]);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const promises = quizHistory.map(async (quiz) => {
        const response = await axiosGet(
          apiRouter.GET_QUIZ.replace(":id", quiz.quizId)
        );
        return { ...quiz, quizDetails: response?.data?.data };
      });

      const results = await Promise.all(promises);

      setQuizDetails(results);
    };

    fetchQuizDetails();
  }, [quizHistory]);

  const chartData = [["Quiz", "Score"]];
  quizDetails?.forEach((quiz) => {
    chartData.push([`${quiz?.quizDetails?.title}`, quiz?.score]);
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Quiz History</DialogTitle>
      <DialogContent>
        {chartData.length > 1 ? (
          <>
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                title: "Quiz Scores",
                hAxis: {
                  title: "Quiz",
                },
                vAxis: {
                  title: "Score",
                  minValue: 0,
                },
              }}
            />
            <Paper elevation={3} sx={{ marginTop: "1rem", padding: "1rem" }}>
              <Typography variant="h6" gutterBottom>
                Quiz Details
              </Typography>

              <TableContainer sx={{ maxHeight: 200, overflow: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Quiz ID</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Max Score</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quizDetails?.map((quiz) => (
                      <TableRow key={quiz?.quizId}>
                        <TableCell>{quiz?.quizDetails?.title}</TableCell>
                        <TableCell>{quiz?.score}</TableCell>
                        <TableCell>{quiz?.maxScore}</TableCell>
                        <TableCell>{quiz?.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            No quiz history available.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizHistoryModal;
