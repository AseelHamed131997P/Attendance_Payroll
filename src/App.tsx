import { Login } from "containers";
import { Main } from "containers";
// import { Router, RouteComponentProps } from "@reach/router";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "routeComponents";
import salaryTable from "ui/components/salaryTable";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/main" component={Main} />
        <PrivateRoute path="/SalaryPayRoll" component={salaryTable} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
// const RouterPage = (
//   props: { pageComponent: JSX.Element } & RouteComponentProps
// ) => props.pageComponent;
