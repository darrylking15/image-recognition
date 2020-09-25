import React, { Component } from 'react'
import axios from 'axios'
//import './Credentials/css'

class Credentials extends Component {
    constructor(){
        super()

        this.state = {
            websiteName: '',
            websiteUrl: '',
            userName: '',
            password: '',

        }
    }

    addCred = (websiteName, websiteUrl, userName, password) => {
        axios.post('/api/cred', {websiteName, websiteUrl, userName, password}).then(cred => {
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
                    <input onChange={(e) => this.handleChange(e)} type='text' placeholder='Website Name' value={websiteName} />
                    <input onChange={(e) => this.handleChange(e)} type='text' placeholder='Website Url' value={websiteUrl} />
                    <input onChange={(e) => this.handleChange(e)} type='text' placeholder='username' value={userName} />
                    <input onChange={(e) => this.handleChange(e)} type='password' placeholder='password' value={password} />
                </div>

                <div>
                    <button onClick={() => {this.addCred(websiteName, websiteUrl, userName, password)}}>Add Credentials</button>
                    <button onClick={() => {this.props.history.push('/dashboard')}}>Cancel</button>
                </div>
            </>
        )
    }
}

export default Credentials