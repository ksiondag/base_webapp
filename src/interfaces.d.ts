import { RouteProps } from "react-router-dom";

export interface AppProps {
    isAuthenticated: boolean;
    userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AppliedRouteObj extends RouteProps {
    component: React.ComponentType<AppProps>;
    appProps: AppProps;
}