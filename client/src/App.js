import React, { Component } from "react";

import Student from "./Student";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "carovhu62y00",
          no: "21627428",
        },
      ],
    };
  }

  // captureFile = (event) => {
  //   event.preventDefault();

  //   // Process file for IPFS. File convert to Buffer
  //   const file = event.target.files[0];
  //   const reader = new window.FileReader(); // file'ı buffer arraya çevirmek için kullanılır. FileReader, Buffer array araçlarını sağlar.
  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend = () => {
  //     this.setState({ buffer: Buffer(reader.result) }); // ipfs'e eklenecek data
  //     console.log("buffer: ", Buffer(reader.result));
  //   };
  // };

  render() {
    return (
      <div className="container mt-5">
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
