import React from "react";
import "./App.css";

import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";

function App() {
    return (
        <React.Fragment>
            <Header />
            <Main />
            <Footer />
        </React.Fragment>
    );
}

export default App;
