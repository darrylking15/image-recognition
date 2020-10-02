import React, {useState} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

function CredDisplay(props) {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [togglePassword, setTogglePassword] = useState(true)

    let e = props.e

	var dateTime = new Date(0); 
	dateTime.setUTCSeconds(props.e.timestamp / 1000);

    const editKeyChain = (id) => {
        props.history.push(`./EditCredentials/${id}`)
    }

    const deleteKeyChain = (id) => {
        axios.delete(`/api/cred/${id}`).then(() => {
            props.getCredentials(); 
        })
    }


    return (
		<div key={e.cred_id}>
			<div className='dashboard__item__main'>
				<div className='dashboard__item'>
					<p className='keyChain__name'>{e.website_name}</p>
					<p className='keyChain__url'>{e.website_url}</p>
					<p className='keyChain__username'>{e.username}</p>
					{/* <p
						name='password'
						type={togglePassword ? 'text' : 'password'}
						placeholder='PASSWORD'
						className='credential__input'
					/> */}

					<i
						className={
							togglePassword
								? 'keyChain__password__off' 
								: 'keyChain__password' 
						}
						onClick={ () => setTogglePassword(!togglePassword)}>
						{e.password}
					</i>
					<p className='keyChain__date'>{dateTime.toLocaleString()}</p>
				</div>
				<div className='edit__dropdown'>
					<img
						alt='edit__dropdown'
						className='edit__dropdown__button'
						src='https://cdn.discordapp.com/attachments/718455188100350035/760075731136020530/Edit_dots.png'
						onClick={ () => setToggleMenu(!toggleMenu)}
					/>
					{toggleMenu? (
						<div className='edit__dropdown__menu'>
							<button
								className='dashboard__edit'
								onClick={() => editKeyChain(e.cred_id)}>
								EDIT
							</button>
							<div className='edit__delete__border'></div>
							<button
								className='dashboard__delete'
								onClick={() => deleteKeyChain(e.cred_id)}>
								DELETE
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}


export default withRouter(CredDisplay);