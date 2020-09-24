import React, { Component } from 'react'
import axios from 'axios'
//import Credentials from './Credentials'
//import Photos from './Photos'
// import './styles/Dashboard.css'
import DashProfile from './DashProfile';
import store from '../../redux/store';
import { connect } from 'react-redux';
import { logoutUser, getUserSession, getUserCredentialsRedux } from '../../redux/reducer'




class Dashboard extends Component{
    constructor(){
        super()
        const reduxState = store.getState();
        this.state = {
            credentials: [],
            user: reduxState.user,
            editToggle: false
        }
    }

    componentDidMount = () => {
        //getUserSession();
        this.getCredentials();
    }

    getUserSession = async () => {
        console.log("---Updating User Session")
        await axios
            .get('/auth/getsession')
            .then( res => {
                console.log("App Update User", res);
                getUserCredentialsRedux(res)
            } )   
      }

    getCredentials = () => {
        axios
            .get(`/api/creds/${this.state.user.userId}`)
            .then(res => {
                console.log(res.data);
                this.setState({credentials: res.data})
                this.props.getUserCredentials(res)
            })
            .catch( error => {
                console.log(error)
            } )
    
    }

    editKeyChain = (title, email, password, message, id) => {
        axios.put(`/${id}`, {title, email, password, message, id}).then(() => {
        })
    }

    deleteKeyChain = (id) => {
        axios.delete(`/${id}`).then(() => {
            this.getCredentials(); 
        })
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
           
        const credsMap = this.state.credentials.map((e, i) => {

            return(
                <div key={e.cred_id} className="dashboard__item__main">
                    
                        <div className="dashboard__item">
                            <p className="keyChain__title">{e.website_name}</p>
                            <p className="keyChain__title">{e.website_url}</p>
                            <p className="keyChain__title">{e.username}</p>
                            <p className="keyChain__title" type="password">{e.password}</p>
                            <p className="keyChain__title__date">{Date(e.update_time)}</p>
                            
                        </div>
                        <div className="dropdown">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                </div>
            )})

      return(
        <div className="dashboard__component">
            <DashProfile />
            {credsMap}
            <div>
                <p>{this.state.user.email ? this.state.user.email : "No User Logged In"}</p>
                <button onClick={ () => this.logout() } >Logout</button>
                <button onClick={ () => this.getCredentials() } >Get Creds</button>
            </div> 
        </div>
        )
    }
}

export default Dashboard