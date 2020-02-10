import * as React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import * as token from "../api/token";

import { RouterAppProps } from "../interfaces";

export default function Login(props: React.PropsWithChildren<RouterAppProps>) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    const login = async (data: { username: string, password: string }) => {
        const result = await token.login(data);

        if (result.success) {
            props.userHasAuthenticated(true);
            props.history.push("/");
        } else {
            alert(result.message);
        }
    };

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        login({ username, password });
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={username}
                        onChange={e => setUsername((e.target as HTMLTextAreaElement).value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword((e.target as HTMLTextAreaElement).value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}