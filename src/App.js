import React, {Component} from 'react';
import routes from './routes';
import './reset.css';
import './css/styles.css'

// CSS Files
// import './App.css';


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
        {routes}
      </div>
    )
  }
}

export default App;
