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
            imgDisplayIndex: 0,
            user: reduxState.user
        }
    }

    componentDidMount = () => {
        this.getUserImages();
    }

    getUserImages = async () => {
        console.log("Getting All User Images");
        const id = this.state.user.userId;
        await axios
            .get(`/api/images/${id}`)
            .then( images => {
                this.setState( { images: images.data } ) 
            } )
            .catch( error => console.log(error) )
    }

    handleImageNav = (cmd) => {
        switch (cmd) {
            case 'back':
                if (this.state.imgDisplayIndex < 4) {
                    this.setState( {imgDisplayIndex: 0 } )
                } else {
                    this.setState( {imgDisplayIndex: this.state.imgDisplayIndex - 4} )
                }
                break;
            case 'next':
                this.setState( {imgDisplayIndex: this.state.imgDisplayIndex + 4} )
                break;
        }
    }

    render(){
        const imageMap = this.state.images.map( (e, i) => {
            return <ImageCard key = { i } imageInfo = { e } getUserImages = { this.getUserImages }/> 
        } )

        return(
            <div className="imageList__component">
                <DashProfile />
                {/* <div className="imagelist__profilepic__main">
                    <img src={this.state.user.faceUrl} alt="profile pic" />
                </div> */}
                <div className="dash__profile__border"></div>
                <div className="imageList__main">
                    <div className="imageList__buttons">
                        <button onClick={() => this.handleImageNav('back')} className="imageList__button1">Back</button>
                        <button onClick={() => this.handleImageNav('next')} className="imageList__button2">Next</button>
                    </div>
                    <div className="imageList__middleBorder"></div>
                    <div className="imageList__items">
                        {imageMap[this.state.imgDisplayIndex]}
                        {imageMap[this.state.imgDisplayIndex+1]}
                        {imageMap[this.state.imgDisplayIndex+2]}
                        {imageMap[this.state.imgDisplayIndex+3]}
                    </div>
                    <div className="imageList__pageCount"> placeholder Number</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => state;

export default  connect(mapStateToProps)(ImageList);
