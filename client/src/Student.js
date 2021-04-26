import React, { Component } from "react";

import StudentHeader from "./StudentHeader";
import FileList from "./FileList";

import axios from "axios";


export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // account: "",
      // buffer: null,
      // fileHash: "",
      // contract: null,
      data: [],
      id: "",
      no: "",
    };
  }

  componentDidMount = async () => {
    this.getFiles();
  };

  getFiles = async () => {
    const { studentNo } = this.props.match.params;
    axios.defaults.headers.common["auth-token"] = await localStorage.getItem("token");
    const studentResponse = await axios.post(
        "http://localhost:3000/api/web3/getStudent",
        { studentNo }
    );
    const { 0: id, 1: no } = studentResponse.data;
    const response = await axios.post(
        "http://localhost:3000/api/web3/getFile",
        { studentNo }
    );
    const { data } = response;
    this.setState({
      data,
      id,
      no,
    });
  }

  render() {
    const { id, no } = this.state;
    return (
        <div style={{ }}>
          <div className="container" >
            <div className={"pt-5"}>
              <StudentHeader getFiles={this.getFiles} id={id} no={no} />
              <hr />
              <FileList data={this.state.data} />
            </div>

          </div>
        </div>
    );
  }
}
