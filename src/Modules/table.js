import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, owner, stars, watchers, forks, description, updated) {
  return {
    name,
    owner,
    stars,
    watchers,
    forks,
    description,
    updated: new Date(updated).toISOString().split("T")[0],
  };
}

const getRows = (items = []) => {
  console.log(items.map((r) => r.name));
  return items.map((i) =>
    createData(
      i.name,
      i.owner && i.owner.login,
      i.stargazers_count,
      i.watchers,
      i.forks,
      i.description,
      i.updated_at
    )
  );
};

export default function ResultTable(props) {
  const classes = useStyles();
  const rows = getRows(props.result && props.result.items);
  const handlePageChange = async (event, newVal) => {
    props.setQuery({ ...props.query, page: newVal });
  };
  const handlePageRowChange = async (event) => {
    props.setQuery({
      ...props.query,
      per_page: parseInt(event.target.value),
    });
  };
  useEffect(() => {
    console.log(
      "Do something after counter has changed",
      props.query.page,
      props.query.per_page
    );
    props.handleSubmit();
  }, [props.query.page, props.query.per_page]);
  let pagination = null;
  if (rows.length)
    pagination = (
      <TablePagination
        rowsPerPageOptions={[2, 10, 25, 50]}
        component="div"
        count={props.result.total_count || 0}
        rowsPerPage={props.query.per_page}
        page={props.query.page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageRowChange}
      />
    );
  return (
    <TableContainer component={Paper}>
      {pagination}

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Owner</StyledTableCell>
            <StyledTableCell align="right">Stars</StyledTableCell>
            <StyledTableCell align="right">Watchers</StyledTableCell>
            <StyledTableCell align="right">Forks</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Updated At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.owner}</TableCell>
              <TableCell align="right">{row.stargazers_count}</TableCell>
              <TableCell align="right">{row.watchers}</TableCell>
              <TableCell align="right">{row.forks}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
