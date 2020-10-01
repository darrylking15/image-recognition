import React, { Component } from 'react'
import axios from 'axios'
//import Credentials from './Credentials'
//import Photos from './Photos'
// import './styles/Dashboard.css'
import DashProfile from './DashProfile';
import store from '../../redux/store';
import { connect } from 'react-redux';
import CredDisplay from './CredDisplay'

import { logoutUser, getUserSessionRedux, getUserCredentialsRedux } from '../../redux/reducer'
import './Dashboard.css'


class Dashboard extends Component{
    constructor(){
        super()
        const reduxState = store.getState();
        this.state = {
            credentials: reduxState.credentials,
            user: reduxState.user,
            editToggle: false,

            userId: reduxState.user.userId,
            showPassword: false,

            hidden: true

        }
    }

    componentDidMount = () => {
        this.getUserSession();
    }

    componentDidUpdate() {
		if (!this.state.user.userId) {
			try {
                this.getUserSession();
            } catch {
                console.log("No User on Session, Pushing to Dashboard")
			    this.props.history.push('/');
            }
        }
    }
 
    getUserSession = async () => {
        console.log("---Updating User Session")
        await axios
            .get('/auth/getsession')
            .then( res => {
                console.log("Dash Update User", res.data);
                this.props.getUserSessionRedux(res)
                this.setState( { user: store.getState().user } )
                this.getCredentials();
            } )   
    }

    getCredentials = () => {
        axios
            .get(`/api/creds/${this.state.user.userId}`)
            .then(res => {
                //console.log("Credentials",res.data);
                this.props.getUserCredentialsRedux(res);
                this.setState({credentials: res.data})
            })
            .catch( error => {
                console.log(error)
            } )

    }



    deleteKeyChain = (id) => {
        axios.delete(`/api/cred/${id}`).then(() => {
            this.getCredentials(); 
        })
    }
    
    // toggleShow = () => {
    //     this.setState({showPassword: !this.state.showPassword})
    // }
    
    // toggleEdit = () => {
    //     this.setState({editToggle: !this.state.editToggle})
    // }
    
      

    

    render(){ 
        const credsMap = this.state.credentials.map((e, i) => {

            return(
                    <CredDisplay
                    key={i}
                    e = {e}
                   getCredentials = {this.getCredentials}
                />

             
                // <div key={e.cred_id}>
                //         <div className="dashboard__item__main">
                //             <div className='dashboard__item'>
                //                 <p className="keyChain__item">{e.website_name}</p>
                //                 <p className="keyChain__item">{e.website_url}</p>
                //                 <p className="keyChain__item">{e.username}</p>
                //                 <p  name='password' type={(this.state.showPassword) ? 'text' : 'password'} placeholder='PASSWORD' className="credential__input" />
                //                 <i className={this.state.showPassword ?  'far fa-eye' : 'fas fa-eye-slash keyChain__password'}
                //                     onClick={this.toggleShow}>{e.password}</i>
                //                 <p className="keyChain__date">{Date(e.update_time)}</p>
                //             </div>
                //             <div className="edit__dropdown">
                //                 <img alt='edit__dropdown' className="edit__dropdown__button" src="https://cdn.discordapp.com/attachments/718455188100350035/760075731136020530/Edit_dots.png" onClick={this.toggleEdit}/>
                //                 {this.state.editToggle ? (
                //                     <div className="edit__dropdown__menu">
                //                         <button className="dashboard__edit" onClick={() => this.editKeyChain(e.cred_id)}>EDIT</button>
                //                         <div className="edit__delete__border"></div>
                //                         <button className="dashboard__delete" onClick={() => this.deleteKeyChain(e.cred_id)}>DELETE</button>
                //                     </div>
                //                 ) : null}
                //             </div>
                //         </div>
                // </div>
            )})

      return(

        <div className='dashboard__component'>
            <DashProfile />
            <div className="dash__profile__border"></div>
            <div className="display__header">
                <p className="display__piece">Website Name</p>
                <p className="display__piece">Website URL</p>
                <p className="display__piece">Username</p>
                <p className="display__password">Password (click to reveal)</p>
                <p className="display__date">Date</p>
            </div>
            {credsMap}
        </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {logoutUser, getUserSessionRedux, getUserCredentialsRedux})(Dashboard);