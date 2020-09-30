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
            showPassword: false,
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

    togglePassword = () => {
        this.setState({showPassword: !this.state.showPassword})
    }

    render(){
        const {websiteName, websiteUrl, userName, password, showPassword} = this.state
        return(
            <div className="credential__component">
                <div className="credential__main">
                    <div className="credential__title">Add Credentials</div>
                    <div className="credential__main__inputs">
                        <input onChange={(e) => this.handleChange(e)} name='websiteName' type='text' placeholder='Website Name' className="credential__input" value={websiteName} />
                        <input onChange={(e) => this.handleChange(e)} name='websiteUrl' type='text' placeholder='Website URL' className="credential__input" value={websiteUrl} />
                        <input onChange={(e) => this.handleChange(e)} name='userName' type='text' placeholder='USERNAME' className="credential__input" value={userName} />
                        <input onChange={(e) => this.handleChange(e)} name='password' type={(showPassword) ? 'text' : 'password'} placeholder='PASSWORD' className="credential__input" value={password} />
                        <i className={`far ${showPassword} ? 'fa-eye-slash' : 'fa-eye' credential__main__inputs`}
                        onClick={this.togglePassword} />
                    </div>

                    <div className="credential__buttons">
                        <button onClick={() => {this.props.history.push('/dashboard')}}className="credential__button">CANCEL</button>
                        <button onClick={() => {this.addCred(websiteName, websiteUrl, userName, password)}} className="credential__button">ADD CREDENTIALS</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps)(Credentials);