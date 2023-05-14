import { FunctionComponent, ReactNode } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

interface PublicRouteProps extends RouteProps {
  component?: Exclude<RouteProps["component"], undefined>;
  render?: (props: RouteComponentProps<any>) => ReactNode;
}

const PublicRoute: FunctionComponent<PublicRouteProps> = ({
  component: Component,
  render,
  ...routeProps
}) => {
  const isLoggedIn = localStorage.getItem("user");

  return (
    <Route
      {...routeProps}
      render={(props: any) => {
        if (!isLoggedIn) {
          if (Component) {
            return <Component {...props} />;
          } else if (render) {
            return render(props);
          } else {
            console.error("PublicRoute requires component or render prop");
            return null;
          }
        }

        return (
          <Redirect
            to={{
              pathname: "/main",
            }}
          />
        );
      }}
    />
  );
};

export default PublicRoute;
