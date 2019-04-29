import React, { Component } from "react";
import Logo from "./logo";
import Option from "./option";

class Header extends Component {
  state = {};
  render() {
    return (
      <header>
        <Option />
        <Logo />
      </header>
    );
  }
}

export default Header;
