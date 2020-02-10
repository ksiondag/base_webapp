import * as React from "react";
import { Link, withRouter, Router, RouteComponentProps } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import * as token from "./api/token";

function App(props: React.PropsWithChildren<RouteComponentProps>) {
    const [isAuthenticated, userHasAuthenticated] = React.useState(false);
    const [isAuthenticating, setIsAuthenticating] = React.useState(true);

    React.useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        userHasAuthenticated(await token.verify());
        setIsAuthenticating(false);
    }

    function handleLogout() {
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
