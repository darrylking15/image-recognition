import React, { Component } from 'react';
import axios from 'axios';
import store from '../../redux/store';
import { connect } from 'react-redux';

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
                console.log("Session User Not Found, trying to get user on session")
                this.getUserSession();
            } catch {
                console.log("No User on Session, Pushing to Dashboard")
            }
        }
    }
    
 
    getUserSession = async () => {
        console.log("Get User Session Called")
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
                            src={ this.state.user.faceUrl ? this.state.user.faceUrl : "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-12.jpg" }
                            alt="https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-12.jpg"
                        />
                        <div className="dash__profile__email">{this.state.user.email}</div>
                    </div>
                    <img alt='logo' className="Logo" src="https://cdn.discordapp.com/attachments/718455188100350035/759535676659335198/Logo_Design_HTML2.png"/>
                </div>
            )
        
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(DashProfile);