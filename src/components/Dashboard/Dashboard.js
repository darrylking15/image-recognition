import React, { Component } from 'react';
import store from '../../redux/store';
import { connect } from 'react-redux';
import { logoutUser, getUserSession } from '../../redux/reducer'
import axios from 'axios';

//import Credentials from './Credentials'
//import Photos from './Photos'
//import './Dashboard.css'

class Dashboard extends Component{
    constructor(){
        super()

        const reduxState = store.getState();

        this.state = {
            user: reduxState.user
        }
    }

    componentDidMount = () => {
        getUserSession();
    }

    getUserSession = async () => {
        console.log("---Updating User Session")
        await axios
            .get('/auth/getuser')
            .then( res => {
                console.log("App Update User", res);
                this.props.getUserSession(res)
            } )   
      }
      

    logout = () => {
        axios.delete('/auth/logout').then( res => {
            logoutUser();
            this.props.history.push('/')
        } ).catch( err => {
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <div>
                    <p>{this.state.user.email ? this.state.user.email : "No User Logged In"}</p>
                    <button onClick={ () => this.logout() } >Logout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Dashboard);