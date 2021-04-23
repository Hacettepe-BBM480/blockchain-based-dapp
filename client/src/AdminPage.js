import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Student from "./Student";
import Panel from "./Panel";
import Personel from "./Personel";

import {Button,Navbar} from "react-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import swal from "sweetalert";
import {Link} from "react-router-dom";

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
            <Router>
                <Navbar
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                    }}
                    bg="dark"
                    variant="dark"
                    className={"d-flex"}
                >
                    <Navbar.Brand className="m-3" href="/">
                        HACETTEPE UNIVERSITY
                    </Navbar.Brand>

                    <Link  to={"/personel"}>
                        <Button
                            style={{
                                backgroundColor: "darkgoldenrod",
                                color: "whitesmoke",
                                border: "0px",
                                borderRadius: "10px",
                                marginRight:"50px",
                                marginLeft:"50px"
                            }}
                        >
                            Personels
                        </Button>
                    </Link>
                    <Link to={"/student"}>
                        <Button
                            style={{
                                backgroundColor: "darkgoldenrod",
                                color: "whitesmoke",
                                border: "0px",
                                borderRadius: "10px",
                                marginRight:"50px"
                            }}
                        >
                            Students
                        </Button>
                    </Link>


                    <Button
                        style={{
                            backgroundColor: "darkgreen",
                            color: "white",
                            border: "0px",
                            borderRadius: "10px",
                            marginRight:"50px"
                        }}
                        onClick={this.logOut}
                        className={"ms-auto"}
                    >
                        <ExitToAppIcon className="mr-1" />
                        Sign Out
                    </Button>

                </Navbar>


                    <Switch>
                        <Route
                            exact
                            path="/personel"
                            component={Personel}
                        ></Route>
                        <Route
                            exact
                            path="/student/:studentNo"
                            component={Student}
                        ></Route>
                        <Route
                            path="/"
                            component={Panel}
                        ></Route>
                    </Switch>
            </Router>
        );
    }
}

export default AdminPage;