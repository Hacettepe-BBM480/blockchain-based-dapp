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
    const { studentNo } = this.props.match.params;
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
  };

  render() {
    const { id, no } = this.state;
    return (
      <div>
        <StudentHeader id={id} no={no} />
        <hr />
        <FileList data={this.state.data} />
      </div>
    );
  }
}
