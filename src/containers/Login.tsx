import * as React from "react";
import { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

import { AppProps } from "../interfaces";

export default function Login(props: React.PropsWithChildren<AppProps>) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    const login = async (data: { username: string, password: string }) => {
        const response = await fetch(`http://localhost:8000/token-auth/`, {
            method: `POST`,
            headers: {
                "Content-Type": `application/json`
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();

        console.log(json);

        if (json.token) {
            localStorage.setItem('token', json.token);
            props.userHasAuthenticated(true);
        } else {
            alert(json.non_field_errors)
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