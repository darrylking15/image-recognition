import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store';
import { connect } from 'react-redux';
//import './Credentials/css'

class Credentials extends Component {
    constructor(){
        super()

        const reduxState = store.getState();

        this.state = {
            websiteName: '',
            websiteUrl: '',
            userName: '',
            password: '',
            user: reduxState.user
        }
    }

    addCred = (websiteName, websiteUrl, userName, password) => {
        const userId = this.state.user.userId
        axios.post('/api/cred', {websiteName, websiteUrl, userName, password, userId}).then(cred => {
            this.setState = ({websiteName: cred.data, websiteUrl: cred.data, userName: cred.data, password: cred.data})
            this.props.history.push('/dashboard')
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const {websiteName, websiteUrl, userName, password} = this.state
        return(
            <>
                <div>
                    <input onChange={(e) => this.handleChange(e)} name='websiteName' type='text' placeholder='Website Name' value={websiteName} />
                    <input onChange={(e) => this.handleChange(e)} name='websiteUrl' type='text' placeholder='Website Url' value={websiteUrl} />
                    <input onChange={(e) => this.handleChange(e)} name='userName' type='text' placeholder='username' value={userName} />
                    <input onChange={(e) => this.handleChange(e)} name='password' type='password' placeholder='password' value={password} />
                </div>

                <div>
                    <button onClick={() => {this.addCred(websiteName, websiteUrl, userName, password)}}>Add Credentials</button>
                    <button onClick={() => {this.props.history.push('/dashboard')}}>Cancel</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps)(Credentials);