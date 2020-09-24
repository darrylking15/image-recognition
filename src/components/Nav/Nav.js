import React, { Component } from 'react'
import axios from 'axios'
import './Nav.css'

class Nav extends Component {
	constructor() {
		super()

		this.state = {
			dropDown: false,
		}
	}

	toggleDropDown = () => {
		this.setState({
			dropDown: !this.state.dropDown,
		})
	}

	render() {
		return (
			<>
				<div className='dropdown' onClick={this.toggleDropDown}>
					<i class='fas fa-bars burger'></i>
				</div>
				{this.state.dropDown ? (
					<div className='nav--dropDown'>
						<a
							className='nav__faceVerify'
							href='http://localhost:3000/#/faceverify'>
							Add Face
						</a>
						<a className='nav__credentials' href='http://localhost:3000/#/'>
							Add Password
						</a>
						<a href='http://localhost:3000/#/'>Logout</a>
					</div>
				) : null}
			</>
		)
	}
}

export default Nav
