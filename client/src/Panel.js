import React, {Component} from 'react';
import {Button, Card, Modal} from "react-bootstrap";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PanelStudent from "./PanelStudent";
import axios from "axios";
import swal from "sweetalert";
import AddIcon from "@material-ui/icons/Add";

class Panel extends Component{

    constructor() {
        super();
        this.state = {
            studentList : [],
            show:false,
            studentNo:"",
            errors:{},
            pendingApiCall:false
        }
    }

    componentDidMount() {
        this.getAllStudent();
    }

    getAllStudent = async () => {
        axios.defaults.headers.common["auth-token"] = await localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/web3/getAllStudent");
        this.setState({
            studentList:response.data
        })
    }

    onDelete = async (studentNo) => {
        const body = {
            studentNo
        }
        try{
            const token =  await localStorage.getItem("token");
            await axios.delete("http://localhost:3000/api/web3/deleteStudent", {
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
                this.getAllStudent();
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

    onUpdate = async (studentNo,studentId) => {

        //rest api ye request
        const body = {
            studentNo,
            studentId
        }
        try{
            axios.defaults.headers.common["auth-token"] = await localStorage.getItem("token");
            await axios.put("http://localhost:3000/api/web3/updateStudent",body)
            swal({
                title: "Successfully updated.",
                icon: "success",
                timer: 1500,
            }).then((isClicked) => {
                this.getAllStudent();
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

    register = async () => {
        if(!this.isThereError()){
            try {
                const {studentNo} = this.state;
                const body = {
                    studentNo
                }
                this.setState({ pendingApiCall: true });
                axios.defaults.headers.common["auth-token"] = await localStorage.getItem("token");
                await axios.post("http://localhost:3000/api/web3/addStudent",body);
                swal({
                    title: "Successfully student added.",
                    icon: "success",
                    timer: 1500,
                }).then(async (isClicked) => {
                    await this.getAllStudent();
                    this.handleClose();
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

    isThereError = () => {
        const {studentNo} = this.state;
        return studentNo === null || studentNo === "";
    }

    clearAllParameters = () => {
        this.setState({
            studentNo:"",
            errors:{}
        })
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
        const{
            studentList,
            errors
        } = this.state;
        const {studentNo} =errors;
        return (
            <div className={"container mt-5 d-flex flex-column"} >
                <Card style={{ fontSize:"20px" }}>
                    <Card.Header>
                        <div className="d-flex justify-content-between">
                            <div>
                                <AssignmentIndIcon /> Student List
                            </div>
                            <Button variant="primary" onClick={this.handleShow}>
                                <AddIcon/>
                                Add Student
                            </Button>

                            <Modal show={this.state.show} backdrop="static" centered onHide={this.handleClose}>
                                <Modal.Header >
                                    <Modal.Title>Student Register</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="mb-3 row">
                                        <label
                                            className="col-sm-3 col-form-label"
                                        >
                                            Student No
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                name={"studentNo"}
                                                onChange={this.onChange}
                                                className={this.errorJSXClassName(studentNo)}
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
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Student Id</th>
                                <th scope="col">Student No</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                                {studentList.map(({studentId,studentNo},index) => {
                                    return (
                                        <PanelStudent key={studentId} index={index} onDelete={this.onDelete} onUpdate={this.onUpdate} studentId={studentId} studentNo={studentNo}/>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
};

export default Panel;
