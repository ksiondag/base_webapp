import * as React from "react";
import "./Home.css";

import { AppProps } from "../interfaces";
import Funds from "./Funds";

export default function Home(props: React.PropsWithChildren<AppProps>) {
    return (
        <div className="Home">
            <div className="lander">
                <h1>Example</h1>
                <p>A simple example app with a React frontend and a Django backend.</p>
            </div>
            {props.isAuthenticated &&
                <Funds />
            }
        </div>
    );
}