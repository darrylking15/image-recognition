
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
		const imageSrc = this.Webcam.getScreenshot( { width: 600, height: 480 } );
		this.setState( {imgSrc: imageSrc} )
	};

	render(){
		return (
			<div className="FaceVerify">
				<div className='faceVerify--container'>
					<h3 className="faceVerify__title">FACE VERIFICATION</h3> 
					<img height={200} width={250}  src={this.state.imgSrc} />
					{ this.state.startVideo ? <Webcam
						height={200}
						width={250}
						audio={false}
						ref={this.webcamRef}
						screenshotFormat='image/jpeg'
						className='faceVerify__img'
					/> : null }
					<div className='faceVerify__buttons'>
						<div className="faceVerify__buttons__top">
							<button onClick={ () => this.setState( { startVideo: true } )} className='faceVerify__button__top'>
								Start WEBCAM
							</button>

							<button className='faceVerify__button__top' 
								onClick={ () => this.capture()}>
								CAPTURE
							</button>
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
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default FaceVerify;
