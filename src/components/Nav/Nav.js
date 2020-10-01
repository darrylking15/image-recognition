
import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'; 
import { logoutUser} from '../../redux/reducer'
// import store from '../../redux/store';
import MenuLines from './Nav Icons/menu_lines.png';
import AddFace from './Nav Icons/add_face_icon.png';
import AddPass from './Nav Icons/add_pass_icon.png';
import GridIcon from './Nav Icons/grid_icon.png';
import LogOut from './Nav Icons/Logout_Icon.png';


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

	handleImageListClick = () => {
		console.log("Image List Clicked");
		this.props.history.push('/ImageList')
	}


	render() {
		return (
			<div className="Nav__component">
				<div className='dropdown' onClick={this.toggleDropDown}>
					<img onClick={this.toggleHamburger} alt='dropDownMenu' className='menu__lines' src={MenuLines}/>
				</div>
				{this.state.dropDown && this.state.hamburger ? (
					<div className='nav--dropDown'>
						<div className="nav__icons">
							<div className="nav__top">
								<img
									className='nav__faceVerify'
									href='http://localhost:3000/#/faceverify'
									alt='nav__faceVerify'
									src={AddFace}
									onClick={ () => this.handleNewPhotoClick()}
								/>
								<img 
									className='nav__credentials' 
									alt='nav__credentials'
									href='http://localhost:3000/#/'
									src={AddPass}
									onClick={ () => this.handleNewCredClick()}
								/>
								<img 
									className='nav__credentials__list' 
									alt='nav__credentials'
									href='http://localhost:3000/#/'
									src={GridIcon}
									onClick={ () => this.handleImageListClick()}
								/>
							</div>
							<img 
								className="nav__logout" 
								alt='nav__logout'
								href='http://localhost:3000/#/'
								src={LogOut}
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
