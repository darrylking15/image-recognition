import React, { useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
// import './styles/FaceVerify.css'

const FaceVerify = () => {
    const webcamRef = React.useRef(null);
    const [startVideo, setStartVideo] = useState(false)
    const [imgSrc, setImgSrc] = useState(null);
    const [toggleImg, setToggleImg ] = useState(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot()
        setImgSrc(imageSrc)
    }, [webcamRef, setImgSrc])

    return (
        <>
            <div className='faceVerify--container'>
                <h3>FACE VERIFICATION</h3> 
                <img height={200} width={250}  src={imgSrc} />
                { startVideo ? <Webcam
                    height={1080}
                    width={1920}
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    className='faceVerifyimg'
                /> : null }
                <div id='faceVerifybutton'>
                    <button onClick={ () => setStartVideo(true)} className='faceVerifybutton'>
                        START WEBCAM
                    </button>
                    <button className='faceVerifybutton' onClick={ () => capture()}>Capture</button>

                    <button
                        onClick={() => this.props.history.push('/dashboard')}
                        className='faceVerifybutton'>
                        Cancel
                    </button>
                    <button className='faceVerifybutton'>Face Login</button>
                </div>
            </div>
        </>
    )
}

export default FaceVerify;
