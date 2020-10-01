
import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store';
import { connect } from 'react-redux';






class ImageInfo extends Component{
    constructor(){
        super()
        const reduxState = store.getState();
        this.state = {
            
            user: reduxState.user,
            

            userId: reduxState.user.userId,
           

            

        }
    }

    componentDidMount = () => {
        this.getUserSession();
    }

    getUserImages = async () => {
        console.log("Detect Faces. ");
        await axios
            .get(`/api/images/1`)
            .then( images => {
                this.setState( { images: images.data } ) 
            } )
            .catch( error => console.log(error) )
    }


    
    render(){ 
        return(
            <div>
                <p>Hello</p>
            </div>
        )
    }
        

}
const mapStateToProps = state => state;

export default  connect(mapStateToProps)(ImageInfo);