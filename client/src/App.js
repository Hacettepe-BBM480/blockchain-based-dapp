import React, { Component } from "react";

import AdminPage from "./AdminPage";
import RegisterLoginPage from "./RegisterLoginPage";

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

  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = localStorage.getItem("token");
    if (user != null && token != null && user.role === "ROLE_ADMIN")
      return <AdminPage />;
    let background = "https://kaosgl.org/resim/Egitim/Hacettepe1.jpg";
    return (
        <div style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          height:"100vh"
        }}>
          <div className="container">
            <RegisterLoginPage />
          </div>
        </div>

    );
  }
}
