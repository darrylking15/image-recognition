import React, { Component } from 'react'
import './Login.scss'

class Login extends Component {
    constructor(){
        super()

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            is_admin: false,
            newUser: false,
            faceRec: false
        }
    }

    register = () => {
        const {firstName, lastName, email, password} = this.state
        axios.post('/auth/register', {firstName, lastName, email, password}).then((res) => {
            this.props.history.push('/dashboard')
        }).catch((err) => {
            console.log(err)
            alert('User already exists')
        })
    }

    login = () => {
        const {email, password} = this.state
        axios.post('/auth/login', {email, password}).then((res) => {
            this.props.history.push('/dashboard')
        }).catch((err) => {
            console.log(err)
            alert('Incorrect email or password')
        })
    }

    toggle = () => {
        this.setState({newUser: !this.state.newUser, faceRec: !this.state.faceRec})
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
                        <input className='login__input' name='password' type='text' value={password} placeholder='PASSWORD' onChange={(e) => this.changeHandler(e)}></input>
                    </div>
                    <div id='login__button'>
                        <button className='login__button' onClick={this.login}>LOGIN</button>
                        <button className='login__button' onClick={this.register}>REGISTER</button>
                     </div>
                 </div>
                    ) : (
                        <div className='login--container'>
                        <h1 className='login__title'>REGISTER</h1>
                        <div id='login__input'>
                            <input className='login__input' name='lastName' type='text' value={firstName} placeholder='First Name' onChange={(e) => this.changeHandler(e)}></input>
                            <input className='login__input' name='firstName' type='text' value={lastName} placeholder='Last Name' onChange={(e) => this.changeHandler(e)}></input>
                            <input className='login__input' name='email' type='text' value={email} placeholder='EMAIL' onChange={(e) => this.changeHandler(e)}></input>
                            <input className='login__input' name='password' type='text' value={password} placeholder='PASSWORD' onChange={(e) => this.changeHandler(e)}></input>
                        </div>
                        <div id='login__button'>
                            <button className='login__button' onClick={this.login}>LOGIN</button>
                            <button className='register__button' onClick={this.register}>REGISTER</button>
                            <button className='two__factor__button' onClick={this.toggle}>Two factor authentication</button>
                         </div>
                     </div>
                    )} 
            </div>
        )
    }
}

export default Login