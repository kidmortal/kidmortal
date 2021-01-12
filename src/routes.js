import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/home";
import Sistemas from "./pages/sistemas";
import Ranking from "./pages/ranking";
import Battle from "./pages/battle";
import Shop from "./pages/shop";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Cheques from "./pages/cheques";
import ContaCorrente from "./pages/contaCorrente";
import MainNavbar from "./components/mainNavbar";
import Footer from "./components/copyrightFooter";

const AuthRouteLogged = (props) => {
  let player = useSelector((state) => state.player);
  const { type } = props;
  if (type === "guest" && player) return <Redirect to="/profile" />;
  else if (type === "logged" && !player) return <Redirect to="/" />;

  return <Route {...props} />;
};

const AuthRouteSystemAccess = (props) => {
  let character = useSelector((state) => state.character);
  const { system } = props;
  if (system === "cheques" && !character.Cheques)
    return <Redirect to="/sistemas" />;
  if (system === "contacorrente" && !character.ContaCorrente)
    return <Redirect to="/sistemas" />;

  return <Route {...props} />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sistemas" component={Sistemas} />
        <Route exact path="/loja" component={Shop} />
        <Route exact path="/batalha" component={Battle} />
        <Route exact path="/informacoes" component={Home} />
        <Route exact path="/ranking" component={Ranking} />
        <AuthRouteLogged
          exact
          path="/register"
          type="guest"
          component={Register}
        />
        <AuthRouteLogged exact path="/login" type="guest" component={Login} />
        <AuthRouteLogged
          exact
          path="/profile"
          type="logged"
          component={Profile}
        />
        <AuthRouteSystemAccess
          exact
          path="/cheques"
          system="cheques"
          component={Cheques}
        />
        <AuthRouteSystemAccess
          exact
          path="/contacorrente"
          system="contacorrente"
          component={ContaCorrente}
        />
      </Switch>
      {
        //  <Footer />
      }
    </BrowserRouter>
  );
};

export default Routes;
