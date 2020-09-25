import React, { Component } from 'react'
import Webcam from 'react-webcam'
import './Photos.css'

class Photos extends Component{
    constructor(){
        super()

        this.state = {
            startCam: false
        }
    }

    toggleCam = () => {
        this.setState({startCam: !this.state.startCam})
    }

    webcamRef = Webcam => {
		this.Webcam = Webcam;
	};

    capture = () => {
		const imageSrc = this.Webcam.getScreenshot( { width: 600, height: 480 } );
		this.setState( {imgSrc: imageSrc} )
	};

    render(){
        return(
            <div className='photos'>
                <div className='add__photos'>
                    <h1 className='photo__title'>Face Input</h1>
                    <div className='photo__camera'>
                    <img height={200} width={250}  src={this.state.imgSrc} />
					{ this.state.startCam ? <Webcam
						height={250}
						width={200}
						audio={false}
						ref={this.webcamRef}
						screenshotFormat='image/jpeg'
						className='photo__img'
                        /> : null }
                    </div>
                    <div className='photo__buttons'>
                        <div className='add__photo'>Drop files</div>
                        <button onClick={() => this.capture()}>Capture</button>
                        <button onClick={() => this.toggleCam()} className='take__photo'>Live Cam</button>
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

export default Photos