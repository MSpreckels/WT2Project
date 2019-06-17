import React from "react";
import "./App.css";

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

import io from "socket.io-client";

function App() {

  var socket = io.connect("http://localhost:5000");

  return (
    <div className="App">
      <Header />
      <Main socket={socket}/>
      <Footer socket={socket}/>
    </div>
  );
}

export default App;
