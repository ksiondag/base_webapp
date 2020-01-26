import * as React from "react";
import { Link, withRouter, Router } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { RouterAppProps } from "./interfaces";

function App(props: RouterAppProps) {
    const [isAuthenticated, userHasAuthenticated] = React.useState(false);
    const [isAuthenticating, setIsAuthenticating] = React.useState(true);

    React.useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        const token = localStorage.getItem(`token`);

        if (!!token) {
            userHasAuthenticated(true);
        }
        setIsAuthenticating(false);
    }

    function handleLogout() {
        localStorage.removeItem(`token`);
        userHasAuthenticated(false);
        props.history.push(`/login`);
    }

    return (!isAuthenticating &&
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Example</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {isAuthenticated
                            ?
                            <NavItem onClick={handleLogout}>Logout</NavItem>
                            :
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
        </div>
    );
}

export default withRouter(App);
