import React, {Component} from 'react';
import axios from "axios";
import {Card} from "react-bootstrap";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PanelPersonel from "./PanelPersonel";

export default class Personel extends Component {

    constructor() {
        super();
        this.state = {
            personels : []
        }
    }

    componentDidMount =  async () =>  {
        const personels = await this.getAllPersonel();
        this.setState({
            personels
        })
    }
    //DELETE UPDATE REGISTER
    //DELETE UPDATE
    getAllPersonel = async () => {
        axios.defaults.headers.common["auth-token"] = await localStorage.getItem("token");
        const personelResponse = await axios.get(
            "http://localhost:3000/api/personel/getAll",
        );
        return personelResponse.data;
    }

    onDelete = async (id) => {
        //REST API REQUEST FOR DELETE
        //this.setState({
        //  personels : this.getAllPersonel();
        // })
        console.log(id);
    }

    onUpdate = async () => {

    }

    render() {
        const {personels} = this.state;
        return (
            <div className={"container mt-5 d-flex flex-column"} >
                <Card style={{ fontSize:"20px" }}>
                    <Card.Header><AssignmentIndIcon /> Personel List</Card.Header>
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
                                className="col-3">
                                Name
                            </div>
                            <div
                                className="col-3">
                                Surname
                            </div>
                        </div>
                        <hr/>
                        {personels.map(({_id,email,name,surname},index) => {
                            return (
                                <PanelPersonel key={index} onDelete={this.onDelete} onUpdate={this.onUpdate} personelId={_id} email={email} name={name} surname={surname}/>
                            );
                        })}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}