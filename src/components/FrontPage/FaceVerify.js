import React, { Component, useRef } from 'react';
import Webcam from 'react-webcam';
import store from '../../redux/store';
import { connect } from 'react-redux';
// import './styles/FaceVerify.css'

class FaceVerify extends Component{
	constructor() {
		super();

		const reduxState = store.getState();

		this.state = {
			startVideo: false,
			imgSrc: null,
			toggleImg: false,
			user: reduxState.user
		}

	}

	webcamRef = Webcam => {
		this.Webcam = Webcam;
	};
	
	capture = () => {
		const imageSrc = this.Webcam.getScreenshot( { width: 1920, height: 1080 } );
		this.setState( {imgSrc: imageSrc} )
	};

	render(){
		return (
			<div className="FaceVerify">
				<div className='faceVerify--container'>
					<h3>FACE VERIFICATION</h3> 
					<img height={200} width={250}  src={this.state.imgSrc} />
					{ this.state.startVideo ? <Webcam
						height={1080}
						width={1920}
						audio={false}
						ref={this.webcamRef}
						screenshotFormat='image/jpeg'
						className='faceVerify__img'
					/> : null }
					<div id='faceVerify__button'>
						
						<button onClick={ () => this.setState( { startVideo: true } )} className='faceVerify__button'>
							START WEBCAM
						</button>

						<button className='faceVerify__button' 
							onClick={ () => this.capture()}>
							Capture
						</button>
						
						<button
							className='faceVerify__button'
							onClick={() => this.props.history.push('/dashboard')}>
							Cancel
						</button>

						<button className='faceVerify__button'>
							Face Login
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default FaceVerify;
