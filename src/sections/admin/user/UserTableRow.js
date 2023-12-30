import React from "react";
import {
  Checkbox,
  TableCell,
  TableRow,
  Button,
  Stack,
  Avatar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserTableRow = ({ row, isItemSelected, handleClick }) => {
  const labelId = `enhanced-table-checkbox-${row._id}`;
  const navigate = useNavigate();

  // console.log("row?.profile_pic :>> ", row?.profile_pic);

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
        <Stack
          direction="row"
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar
            alt={row?.username}
            src={row?.profile_pic}
            sx={{ width: 32, height: 32 }}
          />
          <Typography sx={{ marginLeft: "0.5rem" }}>{row?.username}</Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">{row?.email}</TableCell>
      <TableCell align="left">{row?.phoneNumber}</TableCell>
      <TableCell align="left">{row?.firstName}</TableCell>
      <TableCell align="left">{row?.lastName}</TableCell>
    </TableRow>
  );
};

export default UserTableRow;
