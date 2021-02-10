import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function SelectedRowMenu(props) {
  function deleteCheque() {
    let cheques = props.cheques;
    let selected = props.selectedRow;
    let index = cheques.findIndex((e) => e.id === selected.id);
    fetch(
      `${process.env.REACT_APP_API_url}/mongoCheques?key=${process.env.REACT_APP_API_key}&type=delete&id=${selected._id}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.response === "Success") {
          toast.success(
            `Cheque ${cheques[index].numeroCheque} Excluido com Sucesso`
          );
          cheques.splice(index, 1);
          props.setCheques(cheques);
          props.setAnchorEl(null);
        }
        if (data.response === "Error") {
          toast.error("Erro na exclusão");
        }
      });
  }

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
      <StyledMenuItem
        onClick={() => {
          props.setOpenModal(true);
          props.setAnchorEl(null);
        }}
      >
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </StyledMenuItem>
      <StyledMenuItem
        onClick={() => {
          deleteCheque();
        }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </StyledMenuItem>
    </StyledMenu>
  );
}
