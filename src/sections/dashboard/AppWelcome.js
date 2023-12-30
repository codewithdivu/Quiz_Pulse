import { styled } from "@mui/material/styles";
import { Typography, Card, CardContent } from "@mui/material";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  borderRadius: "1rem",
  backgroundColor: "#dcf6e8",
  marginBottom: "2rem",
  padding: "2rem",
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function AppWelcome() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: "grey.800",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          Welcome back, ADMIN
        </Typography>

        <Typography
          variant="h2"
          sx={{
            maxWidth: 480,
            fontWeight: "bold",
            marginLeft: "1rem",
          }}
        >
          Quiz Pulse
        </Typography>
      </CardContent>
    </RootStyle>
  );
}
