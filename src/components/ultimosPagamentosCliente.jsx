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
import SelectedChequeLoteMenu from "./selectedChequeLoteMenu";

const columns = [
  { id: "dataRecebimento", label: "Data", minWidth: 170 },
  {
    id: "total",
    label: "Total Pago",
    minWidth: 100,
    align: "right",
    format: (value) => `R$ ${value.toLocaleString("pt-BR")}`,
  },
  {
    id: "quantidade",
    label: "Total Cheques",
    minWidth: 100,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    minHeight: 260,
    maxHeight: 260,
  },
});

export default function UltimosPagamentosCliente(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLote, setSelectedLote] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <SelectedChequeLoteMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        selectedLote={selectedLote}
        fetchChequesCliente={props.fetchChequesCliente}
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.totalPagamentos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.dataRecebimento}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setSelectedLote(row);
                          }}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4]}
        component="div"
        count={props.totalPagamentos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
