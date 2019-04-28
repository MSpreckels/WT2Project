import React, { Component } from "react";
import "../css/main.css";

class Text extends Component {
  state = {
    phrases: [
      "random access meal",
      "Love at first meal?",
      "Einfach mal über was anderes quatschen?"
    ]
  };

  getRandomIndex() {
    return Math.floor(Math.random() * this.state.phrases.length);
  }

  render() {
    let index = this.getRandomIndex();
    return (
      <div className="catchphrase center">{this.state.phrases[index]}</div>
    );
  }
}

export default Text;
