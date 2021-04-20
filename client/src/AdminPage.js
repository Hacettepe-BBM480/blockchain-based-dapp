import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Student from "./Student";
import {Button,Navbar} from "react-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import swal from "sweetalert";

class AdminPage extends Component {

    logOut = (event) => {
        swal({
            title: "Are you sure?",
            text: "Do you really want to Sign Out?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((logout) => {
            if (logout) {
                localStorage.clear();
                window.location.replace("/");
            }
        });
    };

    render() {
        return (
            <div>
                <Navbar
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                    }}
                    bg="dark"
                    variant="dark"
                    className={"d-flex justify-content-between"}
                >
                    <Navbar.Brand className="m-3" href="/">
                        HACETTEPE UNIVERSITY
                    </Navbar.Brand>

                    <Button
                        style={{
                            backgroundColor: "darkgreen",
                            color: "white",
                            border: "0px",
                            borderRadius: "10px",
                            marginRight:"50px"
                        }}
                        onClick={this.logOut}
                    >
                        <ExitToAppIcon className="mr-1" />
                        Sign Out
                    </Button>
                </Navbar>

                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/student/:studentNo"
                            component={Student}
                        ></Route>
                        <Route
                            path="/"
                            render={(props) => {
                                return <h1>HOME</h1>;
                            }}
                        ></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default AdminPage;