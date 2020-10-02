
import React, { Component } from 'react';
import Webcam from 'react-webcam';
import store from '../../redux/store';
// import { connect } from 'react-redux';
// import './styles/FaceVerify.css'
import axios from 'axios';

class FaceVerify extends Component{
	constructor(props) {
		super(props);

		const reduxState = store.getState();

		this.state = {
			stepCounter: 0,
			webcamCapture: '',
			matchSim: '',
			imgSrc: '', 
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

	webcamRef = Webcam => {
		this.Webcam = Webcam;
	};

	capture = () => {
        console.log("Capture Called");
		try {
            const imageSrc = this.Webcam.getScreenshot( { width: 600, height: 480 } );
		    this.setState( {webcamCapture: imageSrc, stepCounter: 2} )
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
					imageInfo: res.data.imageInfo,
					stepCounter: 3
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
			.then( res => {
				console.log(res.data)
				setTimeout(() => { this.setState({ matchSim: "Face Does Not Match" }) }, 3000);
				if (res.data.FaceMatches[0]) {
					console.log("Similarity: ", res.data.FaceMatches[0].Similarity);
					const similarity = `Face Match: ${res.data.FaceMatches[0].Similarity.toString().slice(0,4)}%`;
					this.setState({ matchSim: similarity })
					if (res.data.FaceMatches[0].Similarity > 95) {
						setTimeout(() => { this.props.history.push('/dashboard') }, 2000);
					} else if (res.data.FaceMatches[0].Similarity < 95) {
						alert("Face Detected, but not enough to login. Try Again.")
					} else if (res.data.UnmatchedFaces[0]) {
						alert("No similar face detected.")
					} else {
						alert("Something Weird Happend")
					} 
				} else if (res.data.UnmatchedFaces[0]) {
					alert("No similar face detected.")
					this.setState({ matchSim: "Face Does Not Match" })
				}
			})
			.catch(err => console.log(err))

		}

	render(){

		let stepView = () => { switch(this.state.stepCounter) {
			case 0:
				return(
					<div className='faceVerify--container'>
						<h3 className="faceVerify__title">FACE VERIFICATION</h3> 
						<div className='faceVerify__buttons'>
							{/* <div className="faceVerify__buttons__top">
							</div> */}
							<div className="faceVerify__buttons__bottom">
								<button className='faceVerify__button__bottom' onClick={() => this.props.history.push('/')} >CANCEL</button>
								<button className='faceVerify__button__bottom' onClick={() => this.setState( { stepCounter: 1 } ) }>LIVE CAM</button>
							</div>
						</div>
					</div>
				)
			case 1:
				return(
					<div className='faceVerify--container'>
						<h3 className="faceVerify__title">FACE VERIFICATION</h3> 
						<Webcam height={200} width={270} audio={false} ref={this.webcamRef} screenshotFormat='image/jpeg' className='photo__img' /> 
						<div className='faceVerify__buttons'>
							{/* <div className="faceVerify__buttons__top">
							</div> */}
							<div className="faceVerify__buttons__bottom">
								<button className='faceVerify__button__bottom' onClick={() => this.props.history.push('/')} >CANCEL</button>
								<button className='faceVerify__button__bottom' onClick={() => this.capture()} >CAPTURE</button>
							</div>
						</div>
					</div>
				)
			case 2:
				return(
					<div className='faceVerify--container'>
						<h3 className="faceVerify__title">FACE VERIFICATION</h3> 
						<img height={200} width={270}  src={this.state.webcamCapture} alt="capture"/>
						<div className='faceVerify__buttons'>
							{/* <div className="faceVerify__buttons__top">
							</div> */}
							<div className="faceVerify__buttons__bottom">
								<button className='faceVerify__button__bottom' onClick={() => this.props.history.push('/')} >CANCEL</button>
								<button className='faceVerify__button__bottom' onClick={() => this.setState( { stepCounter: 1 } ) }>~Try Again~</button>
								<button className='faceVerify__button__bottom' onClick={() => this.sendToS3()} >Accept Photo</button>
							</div>
						</div>
					</div>
				)
			case 3:
				return(
					<div className='faceVerify--container'>
						<h3 className="faceVerify__title">FACE VERIFICATION</h3> 
						<img height={200} width={270}  src={this.state.webcamCapture} alt="capture"/>
						<div className='faceVerify__buttons'>
							{/* <div className="faceVerify__buttons__top">
							</div> */}
							<div className="faceVerify__buttons__bottom">
								<button className='faceVerify__button__bottom' onClick={() => this.props.history.push('/')} >CANCEL</button>
								<button className='faceVerify__button__bottom' onClick={() => this.compareFaces()} >FACE LOGIN</button>
							</div>
							<h3 className="faceVerify__match">{this.state.matchSim}</h3> 
						</div>
					</div>
				)
			default:
				return(null)	
		} }

		return (
			<div className="FaceVerify">
				{stepView()}
			</div>
		)
	}

}

export default FaceVerify;