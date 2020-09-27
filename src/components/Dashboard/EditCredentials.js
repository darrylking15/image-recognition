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
        this.setState({credId: credId})
        // Add Call to backend to get credential info by its ID
        axios.get(`/api/cred/${credId}`, { params: {id: credId} }).then(res => {
            console.log(res)
                this.setState({
                    websiteName: res.data[0].website_name,
                    websiteUrl: res.data[0].website_url,
                    username: res.data[0].username,
                    password: res.data[0].password
                })
        })
    


        
    }

    editCredential = () => {
        const {websiteName, websiteUrl, username, password, credId} = this.state
        axios.put(`/api/cred`, {websiteName, websiteUrl, username, password, credId}).then(() => {
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