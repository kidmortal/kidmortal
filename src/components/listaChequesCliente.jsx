import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SelectedRowMenu from "./selectedRowMenu";
import EditSelectedCheque from "./editSelectedCheque";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  {
    id: "dataCheque",
    label: "Data",
    minWidth: 170,
    format: (value) => {
      let data = new Date(value);
      return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    },
  },
  { id: "numeroCheque", label: "Numero", minWidth: 100 },
  {
    id: "valorCheque",
    label: "Valor",
    minWidth: 170,
    align: "right",
    format: (value) => `R$ ${value.toLocaleString("pt-BR")}`,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    minHeight: "100%",
  },
});

export default function ListaChequesCliente(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState({
    id: 0,
    data: 0,
    numero: 0,
    valor: 0,
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  let array = [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <SelectedRowMenu
        cheques={props.cheques}
        setCheques={props.setCheques}
        selectedRow={selectedRow}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setOpenModal={setOpenModal}
      />
      <EditSelectedCheque
        cheques={props.cheques}
        setCheques={props.setCheques}
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedRow={selectedRow}
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
            {props.cheques
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <Slide direction="right" in={true}>
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={(e) => {
                              setAnchorEl(e.currentTarget);
                              setSelectedRow(row);
                            }}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        </Slide>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.cheques.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
