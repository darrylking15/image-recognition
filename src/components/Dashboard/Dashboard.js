import React, { Component } from 'react'
import axios from 'axios'
import Credentials from './Credentials'
import Photos from './Photos'
import './Dashboard.scss'

class Dashboard extends Component{
    constructor(){
        super()

        this.state = {
            title: '',
            email: '',
            password: '',
            message: '',
            keyChains: []
        }
    }

        getKeyChains = () => {
            axios.get('/').then(items => {
                this.setState({keyChain: keyChain.data})
        })
    }

    editKeyChain = (title, email, password, message, id) => {
        axios.put(`/${id}`, {title, email, password, message, id}).then(() => {
        })
    }

    deleteKeyChain = (id) => {
        axios.delete(`/${id}`).then(() => {
            this.getKeyChains
        })
    }



        render(){
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
        return(
            <div>
                {newKeyChain}
            </div>
        )
    }
}

export default Dashboard