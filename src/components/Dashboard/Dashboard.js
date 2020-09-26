import React, { Component } from 'react'
import axios from 'axios'
//import Credentials from './Credentials'
//import Photos from './Photos'
// import './styles/Dashboard.css'
import DashProfile from './DashProfile';
import store from '../../redux/store';
import { connect } from 'react-redux';

import { logoutUser, getUserSessionRedux, getUserCredentialsRedux } from '../../redux/reducer'
import './Dashboard.css'


class Dashboard extends Component{
    constructor(){
        super()
        const reduxState = store.getState();
        this.state = {
            credentials: reduxState.credentials,
            user: reduxState.user,
            editToggle: false,
            userId: reduxState.user.userId,
            hidden: true
        }
    }

    componentDidMount = () => {
        this.getUserSession();
        this.getCredentials();
    }

    

    getUserSession = async () => {
        console.log("---Updating User Session")
        await axios
            .get('/auth/getsession')
            .then( res => {
                //console.log("Dash Update User", res.data);
                this.props.getUserSessionRedux(res)
                this.setState( { user: store.getState().user } )
            } )   
    }

    getCredentials = () => {
        axios
            .get(`/api/creds/${this.state.user.userId}`)
            .then(res => {
                //console.log("Credentials",res.data);
                this.props.getUserCredentialsRedux(res);
                this.setState({credentials: res.data})
            })
            .catch( error => {
                console.log(error)
            } )
    
    }

    editKeyChain = (websiteName, websiteUrl, email, password, id) => {
        axios.put(`/api/cred/${id}`, {websiteName, websiteUrl, email, password, id}).then(() => {
            this.props.history.push('./EditCredentials')
        })
    }

    deleteKeyChain = (id) => {
        axios.delete(`/api/cred/${id}`).then(() => {
            this.getCredentials(); 
        })
    }
    
    toggleShow = () => {
        this.setState({hidden: !this.state.hidden})
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

                <div key={e.cred_id}>
                        <div className="dashboard__item__main">
                            <div className='dashboard__item'>
                                <p className="keyChain__item">{e.website_name}</p>
                                <p className="keyChain__item">{e.website_url}</p>
                                <p className="keyChain__item">{e.username}</p>
                                <p className="keyChain__password" onClick={this.state.toggleShow}>{e.password}</p>
                                <p className="keyChain__date">{Date(e.update_time)}</p>
                            </div>
                            <div className="edit__dropdown">
                                <button onClick={() => this.editKeyChain(e.cred_id)}>Edit</button>
                                <button onClick={() => this.deleteKeyChain(e.cred_id)}>delete</button>
                            </div>
                        </div>
                </div>
            )})

      return(

        <div className='dashboard__component'>
            <DashProfile />
            <div className="dash__profile__border"></div>
            {credsMap}
            {/* <div>
                <p>{this.state.user.email ? this.state.user.email : "No User Logged In"}</p>
                <button onClick={ () => this.logout() } >Logout</button>
                <button onClick={ () => this.getCredentials() } >Get Credentials</button>
            </div>  */}
        </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {logoutUser, getUserSessionRedux, getUserCredentialsRedux})(Dashboard);