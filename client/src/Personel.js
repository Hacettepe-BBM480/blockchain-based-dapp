import React, {Component} from 'react';
import axios from "axios";
import {Button, Card, Modal} from "react-bootstrap";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PanelPersonel from "./PanelPersonel";
import AddIcon from "@material-ui/icons/Add";
import swal from "sweetalert";

export default class Personel extends Component {

    constructor() {
        super();
        this.state = {
            name : "",
            surname : "",
            email : "",
            password : "",
            personels : [],
            show:false,
            errors:{},
            pendingApiCall:false
        }
    }

    clearAllParameters = () => {
        this.setState({
            name:"",
            surname:"",
            email:"",
            password:""
        })
    }

    componentDidMount = () =>  {
        this.getAllPersonel();
    }

    getAllPersonel = async () => {
        axios.defaults.headers.common["auth-token"] = await localStorage.getItem("token");
        const personelResponse = await axios.get(
            "http://localhost:3000/api/personel/getAll",
        );
        this.setState({
            personels:personelResponse.data
        })
    }

    onDelete = async (id) => {
        const body = {
            id
        }
        try{
            const token =  await localStorage.getItem("token");
            await axios.delete("http://localhost:3000/api/personel/delete", {
                headers: {
                    "auth-token": token
                },
                data: {
                    ...body
                }
            });
            swal({
                title: "Successfully deleted.",
                icon: "success",
                timer: 1500,
            }).then((isClicked) => {
                this.getAllPersonel();
            });
        }catch (error){
            swal({
                title: "Warning!",
                text: "Something went wrong.",
                icon: "warning",
                dangerMode: true,
            });
        }
    }

    onUpdate = async (id,name,surname,email) => {
        if(name !== "" && surname !== "" && email !== "") {
            const body = {
                id,
                name,
                surname,
                email
            }
            try{
                axios.defaults.headers.common["auth-token"] = await localStorage.getItem("token");
                await axios.put("http://localhost:3000/api/personel/update",body);
                swal({
                    title: "Successfully updated.",
                    icon: "success",
                    timer: 1500,
                }).then((isClicked) => {
                    this.getAllPersonel();
                });
            }catch (error){
                swal({
                    title: "Warning!",
                    text: "Something went wrong.",
                    icon: "warning",
                    dangerMode: true,
                });
            }
        }else{
            swal({
                title: "Warning!",
                text: "All blanks must be filled.",
                icon: "warning",
                dangerMode: true,
            });
        }
    }

    register = async () => {
        if(!this.isThereError()) {
            const {name, surname, email, password} = this.state;
            const body = {
                name,
                surname,
                email,
                password
            }
            try {
                this.setState({pendingApiCall: true});
                axios.defaults.headers.common["auth-token"] = await localStorage.getItem("token");
                await axios.post("http://localhost:3000/api/user/register", body);
                swal({
                    title: "Successfully personel added.",
                    icon: "success",
                    timer: 1500,
                }).then(async (isClicked) => {
                    await this.getAllPersonel();
                    this.handleClose();
                });
            } catch (error) {
                swal({
                    title: "Warning!",
                    text: "Something went wrong.",
                    icon: "warning",
                    dangerMode: true,
                });
            }
        } else{
            swal({
                title: "Warning!",
                text: "All blanks must be filled.",
                icon: "warning",
                dangerMode: true,
            });
        }
        this.setState({pendingApiCall:false});
    }

    isThereError = () => {
        const {name,surname,email,password} = this.state;
        return name === "" || surname === "" || email === "" || password === "";
    }

    handleClose = () => {
        this.setState({show:false});
        this.clearAllParameters();
    }

    handleShow = () => {
        this.setState({show:true});
    }

    onChange = (e) => {
        const {name,value} = e.target;
        const errors = {...this.state.errors};
        value.trim() === "" ? errors[name] = "must be filled." : errors[name] = undefined;
        this.setState({
            [name] : value,
            errors
        })
    }


    errorJSXClassName = (error) => {
        const className = error
            ? "form-control is-invalid shadow p-2 mb-3"
            : "form-control shadow p-2  mb-3";
        return className;
    }


    render() {
        const {personels,errors} = this.state;
        const {email,password,name,surname} = errors;
        return (
            <div className={"container mt-5 d-flex flex-column"} >
                <Card style={{ fontSize:"20px" }}>
                    <Card.Header>
                        <div className="d-flex justify-content-between">
                            <div>
                                <AssignmentIndIcon /> Personel List
                            </div>
                            <Button variant="primary" onClick={this.handleShow}>
                                <AddIcon/>
                                Add Personel
                            </Button>

                            <Modal show={this.state.show} backdrop="static" centered onHide={this.handleClose}>
                                <Modal.Header >
                                    <Modal.Title>Personel Register</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="mb-3 row">
                                        <label
                                            className="col-sm-3 col-form-label"
                                        >
                                            Name
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name={"name"}
                                                onChange={this.onChange}
                                                className={this.errorJSXClassName(name)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label
                                            className="col-sm-3 col-form-label"
                                        >
                                            Surname
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name={"surname"}
                                                onChange={this.onChange}
                                                className={this.errorJSXClassName(surname)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label
                                            className="col-sm-3 col-form-label"
                                        >
                                            Email
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="email"
                                                name={"email"}
                                                onChange={this.onChange}
                                                className={this.errorJSXClassName(email)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label
                                            className="col-sm-3 col-form-label"
                                        >
                                            Password
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="password"
                                                name={"password"}
                                                onChange={this.onChange}
                                                className={this.errorJSXClassName(password)}
                                            />
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="danger"
                                            onClick={this.register}
                                            disabled={this.state.pendingApiCall}
                                    >
                                        {this.state.pendingApiCall && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        Register
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="row mb-3">
                            <div
                                className="col-3">
                                Personel Id
                            </div>
                            <div
                                className="col-3">
                                Email
                            </div>
                            <div
                                className="col-2">
                                Name
                            </div>
                            <div
                                className="col-3">
                                Surname
                            </div>
                        </div>
                        <hr/>
                        {personels.map(({_id,email,name,surname},index) => {
                             if(JSON.parse(localStorage.getItem("user"))["_id"] !== _id){
                                 return (
                                     <PanelPersonel key={_id} onDelete={this.onDelete} onUpdate={this.onUpdate} personelId={_id} email={email} name={name} surname={surname}/>
                                 );
                             }
                             return <div key={index}></div>

                        })}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}