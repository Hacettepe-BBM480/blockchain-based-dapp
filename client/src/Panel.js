import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PanelStudent from "./PanelStudent";
import axios from "axios";
import swal from "sweetalert";

class Panel extends Component{

    constructor() {
        super();
        this.state = {
            studentList : []
        }
    }

    componentDidMount() {
        this.getAllStudent();
    }

    getAllStudent = async () => {
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

    render() {
        const{
            studentList
        } = this.state;
        return (
            <div className={"container mt-5 d-flex flex-column"} >
                <Card style={{ fontSize:"20px" }}>
                    <Card.Header><AssignmentIndIcon /> Student List</Card.Header>
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
