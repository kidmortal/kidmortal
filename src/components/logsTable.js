import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import coin from "../assets/coin.svg";

const columns = [
  { id: "hour", label: "Hora", minWidth: 40 },
  { id: "message", label: "Log", minWidth: 550 },
  {
    id: "coinReward",
    label: "Reward",
    minWidth: 200,
    format: (value) => `+${value}`,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    height: "100%",
    width: 1000,
  },
  tableCell: {
    padding: 5,
  },
  goldIcon: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  bigText: {
    padding: 5,
    fontSize: 25,
  },
});

export default function LogsTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {props.logs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          className={
                            column.id === "coinReward"
                              ? classes.bigText
                              : classes.tableCell
                          }
                          key={column.id}
                          align="center"
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                          {column.id === "coinReward" ? (
                            <img
                              className={classes.goldIcon}
                              alt="coin"
                              src={coin}
                            />
                          ) : (
                            ""
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
