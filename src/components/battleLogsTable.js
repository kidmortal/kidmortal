import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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

const columns = [{ id: "message", label: "Log", minWidth: 550 }];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    minHeight: 200,
    width: 800,
    backgroundColor: "green",
  },
  table: {
    backgroundColor: "green",
  },
  tableCell: {
    padding: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  tableRow: {
    backgroundColor: "green",
  },
});

export default function BattleLogsTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const logs = useSelector((state) => state.battleLogs);

  useEffect(() => {
    console.log(logs);
  }, [logs]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableBody>
            {logs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    className={classes.tableRow}
                  >
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
                          {value}
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
