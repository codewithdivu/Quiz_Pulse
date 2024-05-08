import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Stack,
  Avatar,
  Box,
} from "@mui/material";
import QuizHistoryModal from "../../../components/models/QuizHistoryModal";
import { apiRouter, axiosGet, axiosPost } from "../../../services";

const ProfilesDashboard = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isQuizHistoryOpen, setIsQuizHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axiosGet(apiRouter.GET_ALL_USERS);
        const user = JSON.parse(localStorage.getItem("authUser"));
        const users = res?.data?.data.filter((item) => item._id === user._id);
        // setUserProfiles(res?.data?.data);
        setUserProfiles(users);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleQuizHistoryOpen = async (userId, username) => {
    try {
      const response = await axiosPost(
        apiRouter.GET_USER_SCORE.replace(":userId", userId),
        {
          userId,
        }
      );
      console.log("response :>> ", response);
      setSelectedProfile({
        userId,
        username,
        quizHistory: response?.data?.data,
      });

      setIsQuizHistoryOpen(true);
    } catch (error) {
      console.error("Error fetching quiz history:", error);
    }
  };

  const handleQuizHistoryClose = () => {
    setIsQuizHistoryOpen(false);
    setSelectedProfile(null);
  };

  return (
    <Container>
      <Box sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          User Profiles
        </Typography>
      </Box>

      {isLoading ? (
        <CircularProgress size="48px" />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userProfiles?.map((profile) => (
                <TableRow key={profile?._id}>
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
                        alt={profile?.username}
                        src={profile?.profile_pic}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography sx={{ marginLeft: "0.5rem" }}>
                        {profile?.email}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{profile?.username}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleQuizHistoryOpen(profile._id, profile.username)
                      }
                    >
                      View Quiz History
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <QuizHistoryModal
        open={isQuizHistoryOpen}
        handleClose={handleQuizHistoryClose}
        quizHistory={selectedProfile ? selectedProfile.quizHistory : []}
      />
    </Container>
  );
};

export default ProfilesDashboard;
