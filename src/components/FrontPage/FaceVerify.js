import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import './styles/FaceVerify.css'

const WebcamCapture = () => {
	const webcamRef = React.useRef(null)
	const [imgSrc, setImgSrc] = useState(null)

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot()
		setImgSrc(imageSrc)
	}, [webcamRef, setImgSrc])

	return (
		<>
			<div className='faceVerify--container'>
				<h3>FACE VERIFICATION</h3>
				<Webcam
					height={250}
					width={200}
					audio={false}
					ref={webcamRef}
					screenshotFormat='image/jpeg'
					className='faceVerify__img'
				/>
				<div id='faceVerify__button'>
					<button onClick={capture} className='faceVerify__button'>
						START WEBCAM
					</button>
					<button className='faceVerify__button'>Capture</button>
					<button
						onClick={() => this.props.history.push('/dashboard')}
						className='faceVerify__button'>
						Cancel
					</button>
					<button className='faceVerify__button'>Face Login</button>
				</div>
			</div>
		</>
	)
}

export default WebcamCapture
