import React from "react";
import { Checkbox, TableCell, TableRow, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const QuestionTableRow = ({ row, isItemSelected, handleClick }) => {
  const labelId = `enhanced-table-checkbox-${row._id}`;
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row._id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row._id}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row">
        {row?.question?.text}
      </TableCell>
      <TableCell align="left">{row?.points}</TableCell>
      <TableCell align="left">{row?.correct_answer}</TableCell>
      <TableCell align="left">
        <Button
          variant="outlined"
          onClick={() => navigate(`/admin/question/edit/${row?._id}`)}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default QuestionTableRow;
