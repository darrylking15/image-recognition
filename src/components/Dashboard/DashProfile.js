import React, { Component } from 'react';
// import {withRouter} from 'react-router-dom';
// import axios from 'axios';
import store from '../../redux/store';
import { connect } from 'react-redux';
import NoProfilePic from '../../imgs/no-profile-pic-icon-12.jpg';
import Logo from '../../imgs/Logo_Design_HTML2.png';

class DashProfile extends Component {
    constructor(){
        super()
        const reduxState = store.getState();
        this.state = {
            // dashProfileInfo: [],
            user: reduxState.user
        }
    }

    componentDidMount() {
        // this.getUserProfileInfo()
    }

    // async getUserProfileInfo() {
    //     const response = await axios.get(``)
    //     this.setState({dashProfileInfo: response.data})
    // }

    render(){
            return(
                <div className="dash__profile__component">
                    <div className="dash__profile__main">
                        <img className="dash__profile__picture" 
                            src={ this.state.user.faceUrl ? this.state.user.faceUrl : NoProfilePic }
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