import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditCliente from "./editCliente";

const columns = [
  { id: "nome", label: "NOME", minWidth: 250 },
  {
    id: "cnpj",
    label: "CNPJ",
    minWidth: 150,
    format: (value) => {
      let stringCnpj = ``;
      value.forEach((cnpj) => {
        stringCnpj += `${cnpj}\n`;
      });
      return stringCnpj;
    },
  },
  { id: "condicaoNF", label: "Condicao", minWidth: 150 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    height: 440,
    width: 700,
  },
});

export default function ClientesTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [currentCliente, setCurrentClient] = useState({ nome: "", cnpj: "" });
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function editCliente(row) {
    console.log(row);
    setCurrentClient(row);
    setEditOpen(true);
  }

  return (
    <Paper className={classes.root}>
      <EditCliente
        open={editOpen}
        setOpen={setEditOpen}
        currentCliente={currentCliente}
        clientes={props.clientes}
        setClientes={props.setClientes}
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
            {props.clientes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Slide direction="right" in={true}>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      className={classes.row}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => {
                              editCliente(row);
                            }}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </Slide>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.clientes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
