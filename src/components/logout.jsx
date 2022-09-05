import React, { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/"; //what happens when we log out is not the responsiblity of this component
  }
  render() {
    return null;
  }
}

export default Logout;
