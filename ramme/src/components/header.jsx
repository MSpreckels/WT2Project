import React, { Component } from "react";
import Logo from "./logo";
import Option from "./option";

class Header extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Option />
        <Logo />
      </React.Fragment>
    );
  }
}

export default Header;
