import React, { Component } from "react";

export default class StudentHeader extends Component {
  render() {
    const { id, no } = this.props;
    return (
      <div className="row">
        <div className="col-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              Student ID
            </span>
            <input
              type="text"
              className="form-control"
              id="studentID"
              aria-describedby="basic-addon3"
              disabled
              defaultValue={id}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              Student NO
            </span>
            <input
              type="text"
              className="form-control"
              id="studentNo"
              aria-describedby="basic-addon3"
              disabled
              defaultValue={no}
            />
          </div>
        </div>
      </div>
    );
  }
}
