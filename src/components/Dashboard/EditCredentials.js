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
            console.log("EditDash Get Cred: ",res.data[0])
                this.setState({
                    websiteName: res.data[0].website_name,
                    websiteUrl: res.data[0].website_url,
                    username: res.data[0].username,
                    password: res.data[0].password
                })
        })
    


        
    }

    editCredential = () => {
        const {websiteName, websiteUrl, username, password, credId} = this.state;
        axios.put(`/api/cred`, {websiteName, websiteUrl, username, password, credId});
        this.props.history.push('/dashboard');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const {websiteName, websiteUrl, username, password} = this.state
        return(
            <div className="credential__component">
                <div className="credential__main">
                    <div className="credential__title">Edit Credentials</div>
                    <div className="credential__main__inputs">
                            <input onChange={(e) => this.handleChange(e)} placeholder='Website Name' type='text' value={websiteName} name='websiteName' className="credential__input"/>
                            <input onChange={(e) => this.handleChange(e)} placeholder='Website Url' type='text' value={websiteUrl} name='websiteUrl' className="credential__input"/>
                            <input onChange={(e) => this.handleChange(e)} placeholder='USERNAME' type='text' value={username} name='username' className="credential__input"/>
                            <input onChange={(e) => this.handleChange(e)} placeholder='PASSWORD' type='password' value={password} name='password' className="credential__input"/>
                        <div className='credential__buttons'>
                            <button onClick={() => this.props.history.push('/dashboard')} className="credential__button">Cancel</button>
                            <button onClick={() => this.editCredential()} className="credential__button">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default EditCredentials