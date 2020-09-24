import React, {Component} from 'react';
import routes from './routes';
import {withRouter} from 'react-router-dom'
import Nav from './components/Nav/Nav'

// CSS Files
// import './App.css';
import './reset.css';
import './css/styles.css';


class App extends Component{
  constructor(){
    super()

    this.state = {
      userSession: {}
    }
  }

  render(){
    return(
      <div>
        {this.props.location.pathname === "/" ? null: <Nav />}
        {routes}
      </div>
    )
  }
}

export default withRouter(App);
