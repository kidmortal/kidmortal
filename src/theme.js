import { createMuiTheme } from "@material-ui/core/styles";

const blue = "#0e49b5";
const orange = "#fc8621";
const green = "#54e346";
const purple = "#583d72";
const pink = "#d35d6e";

export default createMuiTheme({
  palette: {
    common: {
      blue: blue,
      orange: orange,
      green: green,
    },
    primary: {
      main: purple,
    },
    secondary: {
      main: pink,
    },
  },
});
