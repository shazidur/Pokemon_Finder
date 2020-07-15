import React, { Component } from "react";
import "./App.css";
import Home from "./Component/Home/Home";

class App extends Component {
  render() {
    return (
      <div className={"App"}>
        <Home name="any name" />
      </div>
    );
  }
}

export default App;
