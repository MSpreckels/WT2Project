import React, { Component } from "react";
import "../css/text.css";

//TODO: should this be saved as a state?

class Text extends Component {
  state = {};

  getRandomIndex() {
    return Math.floor(Math.random() * this.props.phrases.length);
  }

  render() {
    let index = this.props.phrases.length === 0 ? -1 : this.getRandomIndex();
    return (
      <div className="catchphrase center">
        {index === -1 ? "random access meal" : this.props.phrases[index]}
      </div>
    );
  }
}

export default Text;
