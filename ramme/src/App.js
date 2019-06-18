import React from "react";
import "./App.css";

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

import io from "socket.io-client";
import ApiManager from "./js/ApiManager";

function App() {

  //TODO: Global Vars?

  //Localhost IPs
  var am = new ApiManager("http://localhost:5000/api");
  var socket = io.connect("http://localhost:5000");

  //Marco's Server IPs
  //var am = new ApiManager("http://81.169.194.105:5000/api");
  //var socket = io.connect("http://81.169.194.105:5000");

  return (
    <div className="App">
      <Header />
      <Main socket={socket} am={am} />
      <Footer socket={socket} am={am} />
    </div>
  );
}

export default App;
