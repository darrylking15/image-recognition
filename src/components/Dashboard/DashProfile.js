import React, { Component } from 'react';
import axios from 'axios';
import store from '../../redux/store';
import { connect } from 'react-redux';
import NoProfile from './Dash Icons/no-profile-pic-icon-12.jpg';
import Logo from './Dash Icons/Logo_Design_HTML2.png';

class DashProfile extends Component {
    constructor(){
        super()
        const reduxState = store.getState();
        this.state = {
            // dashProfileInfo: [],
            user: reduxState.user
        }
    }

    componentDidMount = () => {
        this.getUserSession();
    }

    componentDidUpdate() {
		if (!this.state.user.userId) {
			try {
                this.getUserSession();
            } catch {
                console.log("No User on Session, Pushing to Dashboard")
            }
        }
    }
    
 
    getUserSession = async () => {
        await axios
            .get('/auth/getsession')
            .then( () => {
                this.setState( { user: store.getState().user } )
            } )   
    }

    render(){
            return(
                <div className="dash__profile__component">
                    <div className="dash__profile__main">
                        <img className="dash__profile__picture" 
                            src={ this.state.user.faceUrl ? this.state.user.faceUrl : NoProfile}
                            alt="https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-12.jpg"
                        />
                        <div className="dash__profile__email">{this.state.user.email}</div>
                    </div>
                    <img alt='logo' className="Logo" src={Logo}/>
                </div>
            )
        
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(DashProfile);