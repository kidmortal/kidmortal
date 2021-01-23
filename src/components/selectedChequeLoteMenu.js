import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { toast } from "react-toastify";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function SelectedChequeLoteMenu(props) {
  function deleteLote() {
    let cheques = props.selectedLote.cheques;

    for (let index = 0; index < cheques.length; index++) {
      const element = cheques[index];
      console.log(element);

      fetch(
        `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=delete&id=${element._id}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.response === "Success") {
            toast.success(
              `Cheque ${element.numeroCheque} Excluido com Sucesso`
            );
          }
          if (data.response === "Error") {
            toast.error("Erro na exclusão");
          }
        });
      if (index === cheques.length - 1) props.fetchChequesCliente();
    }
  }

  function editLote() {}

  const handleClose = () => {
    props.setAnchorEl(null);
  };

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={handleClose}
    >
      <MenuItem
        onClick={() => {
          props.setAnchorEl(null);
          editLote();
        }}
      >
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.setAnchorEl(null);
          deleteLote();
        }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Delete All" />
      </MenuItem>
    </StyledMenu>
  );
}
