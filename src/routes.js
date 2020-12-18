import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Home from "./pages/home";
import Sistemas from "./pages/sistemas";
import Battle from "./pages/battle";
import Shop from "./pages/shop";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import MainNavbar from "./components/mainNavbar";
import Footer from "./components/copyrightFooter";

const AuthRoute = (props) => {
  let player = useSelector((state) => state.player);
  const { type } = props;
  if (type === "guest" && player) return <Redirect to="/profile" />;
  else if (type === "logged" && !player) return <Redirect to="/" />;

  return <Route {...props} />;
};

const Routes = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sistemas" component={Sistemas} />
          <Route exact path="/loja" component={Shop} />
          <Route exact path="/batalha" component={Battle} />
          <Route exact path="/informacoes" component={Home} />
          <AuthRoute exact path="/register" type="guest" component={Register} />
          <AuthRoute exact path="/login" type="guest" component={Login} />
          <AuthRoute exact path="/profile" type="logged" component={Profile} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;
