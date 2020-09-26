
import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'; 
import { logoutUser, getUserSessionRedux, getUserCredentialsRedux } from '../../redux/reducer'
import './Nav.css'
import store from '../../redux/store';


class Nav extends Component {
	constructor() {
		super()

		this.state = {
            dropDown: false,
            hamburger: false
		}
	}

	toggleDropDown = () => {
		this.setState({
			dropDown: !this.state.dropDown,
		})
    }
    
    toggleHamburger = () => {
        this.setState({
            hamburger: !this.state.hamburger
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
	
	handleNewPhotoClick = () => {
		console.log("New Photo Clicked");
		this.props.history.push('/Photos');
	}
	
	handleNewCredClick = () => {
		console.log("New Cred Clicked");
		this.props.history.push('/Credentials')
	}


	render() {
		return (
			<div className="Nav__component">
				<div className='dropdown' onClick={this.toggleDropDown}>
					<img onClick={this.toggleHamburger} className='menu__lines' src="https://cdn.discordapp.com/attachments/718455188100350035/758979657546072074/menu_lines.png"/>
				</div>
				{this.state.dropDown && this.state.hamburger ? (
					<div className='nav--dropDown'>
						<div className="nav__icons">
							<div className="nav__top">
								<img
									className='nav__faceVerify'
									href='http://localhost:3000/#/faceverify'
									src="https://cdn.discordapp.com/attachments/718455188100350035/758979650629402654/add_face_icon.png"
									onClick={ () => this.handleNewPhotoClick()}
								/>
								<img 
									className='nav__credentials' 
									href='http://localhost:3000/#/'
									src="https://cdn.discordapp.com/attachments/718455188100350035/758979653016485901/add_pass_icon.png"
									onClick={ () => this.handleNewCredClick()}
								/>
							</div>
							<img 
								className="nav__logout" 
								href='http://localhost:3000/#/'
								src="https://cdn.discordapp.com/attachments/718455188100350035/758979655754579968/Logout_Icon.png"
								onClick={ () => this.logout() }
							/>
						</div>
						<div className="nav__border"></div>
					</div>
				) : null}
			</div>
		)
	}
}

export default withRouter(Nav);
