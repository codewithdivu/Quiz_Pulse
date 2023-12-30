import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";

const FeedbackModal = ({
  open,
  setOpen,
  handleFeedbackSubmit,
  isFeedbackSubmitting,
}) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            sx={{
              fontSize: "3rem",
            }}
            size="large"
          />
          <TextField
            label="Comments"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleFeedbackSubmit({ rating, comments })}
          color="primary"
          variant="outlined"
        >
          {isFeedbackSubmitting ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;
