import React, { Component } from "react";
import routes from "./routes";
import Nav from "./components/Nav/Nav";
import { withRouter } from "react-router-dom";

// CSS Files
// import './App.css';
import "./reset.css";
import "./css/styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="app">
        <div>{this.props.location.pathname === "/" || this.props.location.pathname === "/faceverify"? null : <Nav />}</div>
        <div>{routes}</div>
      </div>
    );
  }
}


export default withRouter(App);

