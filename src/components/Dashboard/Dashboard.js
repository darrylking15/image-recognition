import React, { Component } from 'react'
import axios from 'axios'
import Credentials from './Credentials'
import Photos from './Photos'
import './Dashboard.scss'
import store from '../../redux/store';
import { connect } from 'react-redux';
import { logoutUser, getUserSession } from '../../redux/reducer'




class Dashboard extends Component{
    constructor(){
        super()

        this.state = {
            title: '',
            email: '',
            password: '',
            message: '',
            keyChains: [],
            user: this.props.user
        }
    }

        getKeyChains = () => {
            axios.get('/').then(res => {
                this.setState({keyChains: res.data})
        })
    }

    editKeyChain = (title, email, password, message, id) => {
        axios.put(`/${id}`, {title, email, password, message, id}).then(() => {
        })
    }

    deleteKeyChain = (id) => {
        axios.delete(`/${id}`).then(() => {
            this.getKeyChains(); 
        })
    }
    


    componentDidMount = () => {
        getUserSession();
    }

    getUserSession = async () => {
        console.log("---Updating User Session")
        await axios
            .get('/auth/getuser')
            .then( res => {
                console.log("App Update User", res);
                this.props.getUserSession(res)
            } )   
      }
      

    logout = () => {
        axios.delete('/auth/logout').then( res => {
            logoutUser();
            this.props.history.push('/')
        } ).catch( err => {
            console.log(err)
        })
    }



        render(){
            const reduxState = store.getState();
            const newKeyChain = this.state.keyChains.map((e, i) => {

                return(
                    <div key={e.keyChain_id}>
                        <div className="dashboard--nav">

                        </div>
                        <div className="keyChain">
                            <p className="keyChain__title">{e.keyChain.title}</p>
                            <p className="keyChain__email">{e.keyChain.email}</p>
                            <p className="keyChain__password">{e.keyChain.password}</p>
                            <p className="keyChain__message">{e.keyChain.message}</p>
                        </div>
                      
               
                </div>
            )
        })
      return(<div>
            {newKeyChain}
               
               <div>
          <p>{this.state.user.email ? this.state.user.email : "No User Logged In"}</p>
          <button onClick={ () => this.logout() } >Logout</button>
              </div> 
      </div>)
    }
}



      
    



 
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Dashboard);