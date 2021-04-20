import React, {Component} from 'react';
import axios from "axios";
import { Container, Tabs, Tab, Card } from "react-bootstrap";
import { Form ,Button} from "react-bootstrap";
import swal from "sweetalert";
import jwt from "jsonwebtoken";

class RegisterLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            errors : {},
            pendingApiCall : false,
        };
    }

    isThereError = () => {
        const{
            email,
            password,
        } = this.state;
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) ||
            email === null ||
            email === "" ||
            password === null ||
            password === ""
        )
            return true;
        return false;
    }

    onChange = (event) => {
        const { value, name } = event.target;
        const errors = { ...this.state.errors };
        value === ""
                ? (errors[name] = `Must be filled.`)
                : (errors[name] = undefined);

        this.setState({
            [name]: value,
            errors,
        });
    };

    onClick = async  () => {
        const {
            email,
            password,
        } = this.state;
        const body = {
          email,
          password,
        };

        if(!this.isThereError()){
            try {
                this.setState({ pendingApiCall: true });
                const response = await axios.post("http://localhost:3000/api/user/login",body);

                const token = response.data;
                localStorage.setItem("token",token);
                const user = jwt.decode(response.data);
                localStorage.setItem("user", JSON.stringify(user));
                swal({
                    title: "Successfully login.Directing...",
                    icon: "success",
                    timer: 1500,
                }).then((isClicked) => {
                    window.location.href = "/";
                });
            }catch (error){
                console.error(error);
            }
        }else{
            swal({
                title: "Warning!",
                text: "All blanks must be filled.",
                icon: "warning",
                dangerMode: true,
            });
        }

        this.setState({ pendingApiCall: false });
    }

    errorJSXClassName = (error) => {
        const className = error
            ? "form-control is-invalid shadow p-2 mb-3"
            : "form-control shadow p-2  mb-3";
        return className;
    }

    render() {
        const { pendingApiCall, errors } = this.state;
        const {email,password} = errors;
        return (
            <div>
                <Container style={{ width: "48%", padding: "110px" }}>
                    <Tabs
                        className="w-25"
                        defaultActiveKey={"login"}
                        id="uncontrolled-tab-example"
                    >
                        <Tab tabClassName={"bg-dark text-white"}  eventKey="login" title="Sign In">
                            <Card
                                className="p-5 shadow"
                                style={{ backgroundColor: "#e3e3e3" }}
                            >
                                <Card.Body>
                                    <img className="rounded mx-auto d-block"
                                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Hacettepe_%C3%9Cniversitesi_logo.svg/716px-Hacettepe_%C3%9Cniversitesi_logo.svg.png"
                                         alt="Card" style={{width:"200px"}}/>
                                    <Card.Title className="text-muted text-center mt-3">Hacettepe University Students' Affairs</Card.Title>
                                    <Form.Group>
                                        <Form.Label>{"Email"}</Form.Label>
                                        <Form.Control
                                            onChange={this.onChange}
                                            name={"email"}
                                            type={"email"}
                                            placeholder={"Enter email"}
                                            className={this.errorJSXClassName(email)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>{"Password"}</Form.Label>
                                        <Form.Control
                                            onChange={this.onChange}
                                            name={"password"}
                                            type={"password"}
                                            placeholder={"Enter password"}
                                            className={this.errorJSXClassName(password)}
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        onClick={this.onClick}
                                        disabled={pendingApiCall}
                                    >
                                        {pendingApiCall && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        Login
                                    </Button>
                                </Card.Body>

                            </Card>
                        </Tab>
                    </Tabs>
                </Container>

            </div>
        );
    }
}

export default RegisterLoginPage;