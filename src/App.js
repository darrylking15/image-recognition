import React, { Component } from "react";
import routes from "./routes";
import Nav from "./components/Nav/Nav";
import { withRouter } from "react-router-dom";
import axios from 'axios'
import { getUserSessionRedux } from './redux/reducer';
import { connect } from 'react-redux';
import store from './redux/store';


// CSS Files
// import './App.css';
import "./reset.css";
import "./css/styles.css";

class App extends Component {
  constructor() {
    super();

    const reduxState = store.getState();

    this.state = {
      user:reduxState.user,
    };
  }

  componentDidMount = () => {
    this.getUserSession();
}

  getUserSession = async () => {
    console.log("---Updating User Session")
    await axios
        .get('/auth/getsession')
        .then( res => {
            console.log("App Update User", res.data);
            getUserSessionRedux(res)
        } )   
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



const mapStateToProps = state => state;

export default withRouter(App); connect(mapStateToProps, {getUserSessionRedux});

