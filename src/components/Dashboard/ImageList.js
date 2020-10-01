import React, { Component } from 'react'

import store from '../../redux/store';
import { connect } from 'react-redux';
import axios from 'axios';

import DashProfile from './DashProfile';
import ImageCard from './ImageCard';

class ImageList extends Component {
    constructor() {
        super()

        const reduxState = store.getState();

        this.state = {
            images: [],
            user: reduxState.user
        }
    }

    componentDidMount = () => {
        this.getUserImages();
    }

    getUserImages = async () => {
        console.log("Getting All User Images");
        await axios
            .get(`/api/images/1`)
            .then( images => {
                this.setState( { images: images.data } ) 
            } )
            .catch( error => console.log(error) )
    }

    render(){

        const imageMap = this.state.images.map( (e, i) => {
            return <ImageCard key = { i } imageInfo = { e } /> 
        } )

        return(
            <div className="imageList__component">
                <DashProfile />
                <div className="imagelist__profilepic__main">
                    <img src={this.state.user.faceUrl} alt="profile pic" />
                    <p>{JSON.stringify(this.state.user.faceMetaData)}</p>
                </div>
                {imageMap}
            </div>
        )
    }

}

const mapStateToProps = state => state;

export default  connect(mapStateToProps)(ImageList);
