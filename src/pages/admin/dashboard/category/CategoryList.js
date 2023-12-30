import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Button,
  Stack,
  Breadcrumbs,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { axiosDelete, axiosGet } from "../../../../services/axios.config";
import { apiRouter } from "../../../../services/apisRouter.";
import { Link, useNavigate } from "react-router-dom";
import CategoryTableRow from "../../../../sections/admin/category/CategoryTableRow";

const fetchDataFromApi = async (currentPage, rowsPerPage) => {
  const response = await axiosGet(apiRouter.GET_CATEGORY_LIST, {
    page: currentPage,
    pageSize: rowsPerPage,
  });
  const data = response?.data;
  return data;
};

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell
          key="name"
          align="left"
          padding="none"
          sortDirection={orderBy === "name" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={createSortHandler("name")}
            sx={{ fontWeight: "bold" }}
          >
            Name
            {orderBy === "name" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          key="description"
          align="left"
          padding="normal"
          sortDirection={orderBy === "description" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "description"}
            direction={orderBy === "description" ? order : "asc"}
            onClick={createSortHandler("description")}
            sx={{ fontWeight: "bold" }}
          >
            Description
            {orderBy === "description" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          key="edit"
          align="left"
          padding="normal"
          sortDirection={orderBy === "edit" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "edit"}
            direction={orderBy === "edit" ? order : "asc"}
            onClick={createSortHandler("edit")}
            sx={{ fontWeight: "bold" }}
          >
            Edit
            {orderBy === "edit" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, handleDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Categories
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function CategoryList() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromApi(currentPage, rowsPerPage);
      setRows(data?.data);
      setTotalCount(data?.totalPages);
    };

    fetchData();
  }, [rows, currentPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleDelete = (selected) => {
    console.log("delte :>> ", selected);

    try {
      for (const id of selected) {
        const res = axiosDelete(apiRouter.DELETE_CATEGORY.replace(":id", id));
      }
      setRows((prevRows) =>
        prevRows.filter((row) => !selected.includes(row.id))
      );

      setSelected([]);
    } catch (error) {
      console.log("error :>> ", error);
    }
    setSelected([]);
  };

  return (
    <Container>
      <Box sx={{ marginTop: "6rem" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Category List
        </Typography>
        <Stack spacing={2} sx={{ marginTop: "1rem" }}>
          <Breadcrumbs separator="-" aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit">
              Category
            </Link>
            <Typography key="3" color="text.primary">
              List
            </Typography>
            ,{" "}
          </Breadcrumbs>
        </Stack>
      </Box>
      <Box sx={{ width: "100%", marginTop: "2rem" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected?.length}
            handleDelete={() => handleDelete(selected)}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected?.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row._id);

                    return (
                      <CategoryTableRow
                        key={row?._id}
                        row={row}
                        isItemSelected={isItemSelected}
                        handleClick={handleClick}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "1rem",
            }}
          >
            <Pagination
              count={totalCount}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={(e, newPage) => setCurrentPage(newPage)}
            />
          </Box>
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </Container>
  );
}
