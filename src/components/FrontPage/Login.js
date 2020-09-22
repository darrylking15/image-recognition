import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import {loginUser} from '../../redux/reducer';

import './styles/Login.css'

class Login extends Component {
    constructor(){
        super()

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            faceRec: false,
            isAdmin: false,
            newUser: false,
        }
    }

    register = () => {
        const {firstName, lastName, email, password, isAdmin, faceRec} = this.state
        axios.post('/auth/register', 
            {email, 
            password,
            firstName, 
            lastName,
            faceRec,
            isAdmin})
            .then((res) => {
                loginUser(res);
                this.props.history.push('/dashboard')
        }).catch((err) => {
            console.log(err)
            alert('User already exists')
        })
    }

    login = () => {
        const {email, password} = this.state
        axios.post('/auth/login', {email, password})
            .then((res) => {
                this.props.loginUser(res);
                this.props.history.push('/dashboard')
        }).catch((err) => {
            console.log(err)
            alert('Incorrect email or password')
        })
    }

    toggleReg = () => {
        this.setState({newUser: !this.state.newUser})
    }
    
    toggleFaceRec = () => {
        this.setState({faceRec: !this.state.faceRec})
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        const {firstName, lastName, email, password} = this.state
        return(
            <div>
                {!this.state.newUser ? (

                    <div className='login--container'>
                    <h1 className='login__title'>WELCOME</h1>
                    <div id='login__input'>
                        <input className='login__input' name='email' type='text' value={email} placeholder='EMAIL' onChange={(e) => this.changeHandler(e)}></input>
                        <input className='login__input' name='password' type='password' value={password} placeholder='PASSWORD' onChange={(e) => this.changeHandler(e)}></input>
                    </div>
                    <div id='login__button'>
                        <button className='login__button' onClick={this.login}>LOGIN</button>
                        <button className='login__button' onClick={this.toggleReg}>REGISTER NEW USER</button>
                     </div>
                 </div>
                    ) : (
                        <div className='login--container'>
                        <h1 className='login__title'>REGISTER</h1>
                        <div id='login__input'>
                            <input className='login__input' name='firstName' type='text' value={firstName} placeholder='First Name' onChange={(e) => this.changeHandler(e)}></input>
                            <input className='login__input' name='lastName' type='text' value={lastName} placeholder='Last Name' onChange={(e) => this.changeHandler(e)}></input>
                            <input className='login__input' name='email' type='text' value={email} placeholder='EMAIL' onChange={(e) => this.changeHandler(e)}></input>
                            <input className='login__input' name='password' type='password' value={password} placeholder='PASSWORD' onChange={(e) => this.changeHandler(e)}></input>
                        </div>
                        <div id='login__button'>
                            <button className='login__button' onClick={this.register}>REGISTER</button>
                            <button className='register__button' onClick={this.toggleReg}>BACK TO LOGIN</button>
                            <button className='two__factor__button' onClick={this.toggleFaceRec}>Two factor authentication</button>
                         </div>
                     </div>
                    )} 
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {loginUser})(Login);