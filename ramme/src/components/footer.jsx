import React, { Component } from "react";
import Chat from "./chat";
import Info from "./info";

class Footer extends Component {
    state = {};
    render() {
        return(
            <footer>
                <Chat />
                <Info />
            </footer>
        );
    }
}

export default Footer;
