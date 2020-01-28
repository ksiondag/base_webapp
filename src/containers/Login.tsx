import * as React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

import { RouterAppProps } from "../interfaces";

export default function Login(props: React.PropsWithChildren<RouterAppProps>) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    const login = async (data: { username: string, password: string }) => {
        const response = await fetch(`http://localhost:8000/api/token/`, {
            method: `POST`,
            headers: {
                "Content-Type": `application/json`
            },
            body: JSON.stringify(data)
        });
        const token = await response.json();

        if (token.access) {
            localStorage.setItem(`token`, token.access);
            props.userHasAuthenticated(true);
            props.history.push("/");
        } else {
            alert(token.detail)
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