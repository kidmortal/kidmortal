import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
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
import { isAuthenticated } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;
