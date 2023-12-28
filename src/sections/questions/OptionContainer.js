import React from "react";
import {
  Paper,
  Radio,
  useTheme,
  useMediaQuery,
  styled,
  Typography,
  FormControlLabel,
} from "@mui/material";

const OptionRadio = styled(Radio)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    width: "1.5em",
    height: "1.5em",
  },
}));

const OptionLabel = styled(FormControlLabel)(({ theme }) => ({
  marginTop: "1rem",
  // width: "500px",
  // width: "auto",
  // width: "30vw",

  "& .MuiTypography-root": {
    whiteSpace: "normal",
  },
  "&.MuiFormControlLabel-root": {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: theme.spacing(1),
    transition: "border-color 0.3s",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const OptionContainer = ({ option, index }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <OptionLabel
      sx={{
        width: md ? "70vw" : "40vw",
      }}
      value={option?.text}
      control={<OptionRadio />}
      label={
        (option?.type === "text" && option?.text) ||
        (option?.type === "image" && (
          <img
            alt="img"
            src={option?.title}
            height={70}
            width={150}
            style={{ marginLeft: "1rem" }}
          />
        ))
      }
    />
  );
};

export default OptionContainer;
