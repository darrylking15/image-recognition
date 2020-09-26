import React, { Component } from 'react'
import axios from 'axios'

class EditCredentials extends Component{
    constructor(props){
        super(props)

        this.state = {
            websiteName: '',
            websiteUrl: '',
            username: '',
            password: '',
            credId: 0
        }
    }

    componentDidMount() {
        const credId = +this.props.location.pathname.slice(17);
        console.log( "CredID: ", credId );

        // Add Call to backend to get credential info by its ID
        axios.get(`/api/cred/${credId}`, { params: {id: credId} })


        // const {websiteName, websiteUrl, username, password} = this.state
        // this.setState({
        //     websiteName: websiteName,
        //     websiteUrl: websiteUrl,
        //     username,
        //     password
        // })
    }

    editCredential = (websiteName, websiteUrl, email, password, id) => {
        axios.put(`/api/cred/${id}`, {websiteName, websiteUrl, email, password}).then(() => {
            this.props.history.push('./dashboard')
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const {websiteName, websiteUrl, username, password} = this.state
        return(
            <div>
                <div className='edit'>
                        <input onChange={(e) => this.handleChange(e)} placeholder='Website Name' type='text' value={websiteName} name='websiteName' />
                        <input onChange={(e) => this.handleChange(e)} placeholder='Website Url' type='text' value={websiteUrl} name='websiteUrl' />
                        <input onChange={(e) => this.handleChange(e)} placeholder='username' type='text' value={username} name='username' />
                        <input onChange={(e) => this.handleChange(e)} placeholder='password' type='password' value={password} name='password'/>
                    <div className='edit--button'>
                        <button onClick={() => this.editCredential(websiteName, websiteUrl, username, password)}>Edit</button>
                        <button onClick={() => this.props.history.push('./dashboard')}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default EditCredentials