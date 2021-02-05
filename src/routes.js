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
import Pagamentos from "./pages/pagamentos";
import Configuracoes from "./pages/configuracoes";
import Produtos from "./pages/produtos";
import Clientes from "./pages/clientes";
import Consultas from "./pages/consultas";
import Pedidos from "./pages/pedidos";
import PedidosNotas from "./pages/pedidosNotas";
import GerarNf from "./pages/gerarNf";
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
  if (system === "pagamentos" && !character.Pagamentos)
    return <Redirect to="/sistemas" />;
  if (system === "consultas" && !character.Consultas)
    return <Redirect to="/sistemas" />;
  if (system === "configuracoes" && !character.Config)
    return <Redirect to="/sistemas" />;
  if (system === "produtos" && !character.Config)
    return <Redirect to="/sistemas" />;
  if (system === "clientes" && !character.Config)
    return <Redirect to="/sistemas" />;
  if (system === "pedidosnotas" && !character.Consultas)
    return <Redirect to="/pedidos" />;

  return <Route {...props} />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sistemas" component={Sistemas} />
        <Route exact path="/pedidos" component={Pedidos} />
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
        <AuthRouteSystemAccess
          exact
          path="/pagamentos"
          system="pagamentos"
          component={Pagamentos}
        />
        <AuthRouteSystemAccess
          exact
          path="/consultas"
          system="consultas"
          component={Consultas}
        />
        <AuthRouteSystemAccess
          exact
          path="/configuracoes"
          system="configuracoes"
          component={Configuracoes}
        />
        <AuthRouteSystemAccess
          exact
          path="/clientes"
          system="clientes"
          component={Clientes}
        />
        <AuthRouteSystemAccess
          exact
          path="/produtos"
          system="produtos"
          component={Produtos}
        />
        <AuthRouteSystemAccess
          exact
          path="/produtos"
          system="produtos"
          component={Produtos}
        />
        <AuthRouteSystemAccess
          exact
          path="/pedidosnotas"
          system="pedidosnotas"
          component={PedidosNotas}
        />
        <AuthRouteSystemAccess
          exact
          path="/gerarnf"
          system="gerarnf"
          component={GerarNf}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
