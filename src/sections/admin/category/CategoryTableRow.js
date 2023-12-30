import React from "react";
import { Checkbox, TableCell, TableRow, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryTableRow = ({ row, isItemSelected, handleClick }) => {
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
        {row?.name}
      </TableCell>
      <TableCell align="left">{row?.description}</TableCell>
      <TableCell align="left">
        <Button
          variant="outlined"
          onClick={() => navigate(`/admin/category/edit/${row?._id}`)}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CategoryTableRow;
