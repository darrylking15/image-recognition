
import React, { Component, useRef } from 'react';
import Webcam from 'react-webcam';
import store from '../../redux/store';
import { connect } from 'react-redux';
// import './styles/FaceVerify.css'
import axios from 'axios';

class FaceVerify extends Component{
	constructor() {
		super();

		const reduxState = store.getState();

		this.state = {
            startCam: false,
            toggleCamToImage: false,
			webcamCapture: '',
			imgSrc: "", 
            imgId: 0,
            imageInfo: {
                ETag: '',
                Location: '',
                Key: "",
                Bucket: ''
            },
            user: reduxState.user
        }

	}

	webcamRef = Webcam => {
		this.Webcam = Webcam;
	};

	toggleCam = () => {
        console.log("Start Webcam");
        this.setState({startCam: true, toggleCamToImage: false})
    }

	
	capture = () => {
        console.log("Capture Called");
		try {
            const imageSrc = this.Webcam.getScreenshot( { width: 600, height: 480 } );
		    this.setState( {webcamCapture: imageSrc, toggleCamToImage: true} )
        }
        catch {
            alert("Turn on Webcam to capture photo")
        }
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
            .then( res => {
                this.setState( {
                    imgId: res.data.imgId,
                    imageInfo: res.data.imageInfo
                } );
                console.log("Send to S3 Return Data: ", res.data);
            } )
            .catch( error => console.log(error) );
	}
	




	compareFaces = () => {
		console.log("Comparing Faces"); 
		const Key = this.state.imageInfo.Key; 
		const faceKey = this.state.user.faceKey; 
		console.log("Key: ", Key); 
		console.log("FaceKey: ", faceKey); 
		axios
			.post('/compareFaces', {
				faceKey: faceKey, 
				Key: Key
			})
			.catch(err => console.log(err))
	}

	render(){
		return (
			<div className="FaceVerify">
				<div className='faceVerify--container'>
					<h3 className="faceVerify__title">FACE VERIFICATION</h3> 
					{ this.state.startCam ? this.state.toggleCamToImage ? 
                        <img height={300} width={400}  src={this.state.webcamCapture} /> 
                        : 
                            <Webcam
                            // height={250}
                            // width={200}
                            audio={false}
                            ref={this.webcamRef}
                            screenshotFormat='image/jpeg'
                            className='photo__img'
                            /> 
                        : null }
					<div className='faceVerify__buttons'>
						<div className="faceVerify__buttons__top">
						<button onClick={() => this.toggleCam()} className='faceVerify__button__top'>Live Cam</button>
                        <button onClick={() => this.capture()} className='faceVerify__button__top'>Capture</button>
						</div>
						<div className="faceVerify__buttons__bottom">
							<button
								className='faceVerify__button__bottom'
								onClick={() => this.props.history.push('/dashboard')}>
								CANCEL
							</button>

							<button className='faceVerify__button__bottom'>
								FACE LOGIN
							</button>
				
							<button onClick={() => this.sendToS3()} className='take__photo'>Save Photo</button>
							<button onClick={() => this.compareFaces()}>
								Compare Faces
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default FaceVerify;
