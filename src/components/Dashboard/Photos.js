import React, { Component } from 'react';
import Webcam from 'react-webcam';
import store from '../../redux/store';
import { connect } from 'react-redux';
import axios from 'axios';

import './Photos.css'

class Photos extends Component{
    constructor(){
        super()

        const reduxState = store.getState();

        this.state = {
            startCam: false,
            toggleCamToImage: false,
            webcamCapture: '',
            imgId: 0,
            imageInfo: {
                ETag: '',
                Location: '',
                Key: '',
                Bucket: ''
            },
            user: reduxState.user
        }
    }

    toggleCam = () => {
        console.log("Start Webcam");
        this.setState({startCam: true, toggleCamToImage: false})
    }

    webcamRef = Webcam => {
		this.Webcam = Webcam;
	};

    capture = () => {
        console.log("Capture Called");
		const imageSrc = this.Webcam.getScreenshot( { width: 600, height: 480 } );
		this.setState( {webcamCapture: imageSrc, toggleCamToImage: true} )
    };
    
    sendToS3 = () => {
        console.log("Send to S3 Called");
        const userId = this.state.user.userId;
        const base64Img = this.state.webcamCapture;
        axios
            .post('/upload64S3', { 
            userId: userId,
            imageBinary: base64Img
            } )
            .catch( error => console.log(error) );
    }

    indexPhoto = () => {
        console.log("Index Photo Called");
    }

    savePhotoToDB = () => {
        console.log("Save to DB Called");
    }
    

    render(){
        return(
            <div className='photos'>
                <div className='add__photos'>
                    <h1 className='photo__title'>Face Input</h1>
                    <div className='photo__camera'>
                    
                    { this.state.startCam ? this.state.toggleCamToImage ? 
                        <img height={200} width={250}  src={this.state.webcamCapture} /> 
                        : 
                            <Webcam
                            height={250}
                            width={200}
                            audio={false}
                            ref={this.webcamRef}
                            screenshotFormat='image/jpeg'
                            className='photo__img'
                            /> 
                        : null }
                        
                    </div>
                    <div className='photo__buttons'>
                        <button onClick={() => this.toggleCam()} className='take__photo'>Live Cam</button>
                        <button onClick={() => this.capture()} className='take__photo'>Capture</button>
                        <button onClick={() => this.sendToS3()} className='take__photo'>Send to S3</button>
                        <button onClick={() => this.indexPhoto()} className='take__photo'>Index Photo</button>
                        <button onClick={() => this.savePhotoToDB()} className='take__photo'>Save to DB</button>
                    </div>
                    <div className='photo__buttons'>
                        <button className='photo__cancel'>Cancel</button>
                        <button className='photo__submit'>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Photos);