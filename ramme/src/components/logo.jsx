import React, { Component } from "react";
import logo from "../images/logo.svg";

class Logo extends Component {
  state = {};
  render() {
    return <img src={logo} alt="Logo" className="logo" />;
  }
}

export default Logo;
