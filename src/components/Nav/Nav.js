
import React, { Component } from 'react'
import axios from 'axios'
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
	


	render() {
		return (
			<div className="Nav__component">
				<div className='dropdown' onClick={this.toggleDropDown}>
					<img onClick={this.toggleHamburger} class='menu__lines' src="https://cdn.discordapp.com/attachments/718455188100350035/758979657546072074/menu_lines.png"/>
				</div>
				{this.state.dropDown && this.state.hamburger ? (
					<div className='nav--dropDown'>
						<div className="nav__icons">
							<div className="nav__top">
								<img
									className='nav__faceVerify'
									href='http://localhost:3000/#/faceverify'
									src="https://cdn.discordapp.com/attachments/718455188100350035/758979650629402654/add_face_icon.png"
								/>
								<img 
									className='nav__credentials' 
									href='http://localhost:3000/#/'
									src="https://cdn.discordapp.com/attachments/718455188100350035/758979653016485901/add_pass_icon.png"
								/>
							</div>
							<img 
								className="nav__logout" 
								href='http://localhost:3000/#/'
								src="https://cdn.discordapp.com/attachments/718455188100350035/758979655754579968/Logout_Icon.png"
							/>
						</div>
						<div className="nav__border"></div>
					</div>
				) : null}
			</div>
		)
	}
}

export default Nav;
