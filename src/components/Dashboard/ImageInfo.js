
import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store';
import { connect } from 'react-redux';
import { getUserSessionRedux } from '../../redux/reducer';
import Webcam from 'react-webcam';


class ImageInfo extends Component{
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

    getUserSession = async () => {
        console.log("Get User Session Called")
        await axios
            .get('/auth/getsession')
            .then( res => {
                console.log("Photos Update User from Session", res.data);
                this.props.getUserSessionRedux(res)
                this.setState( { user: store.getState().user } )
            } )     
    }

    toggleCam = () => {
        console.log("Start Webcam");
        this.setState({startCam: true, toggleCamToImage: false, stepCounter: 1})
    }

    webcamRef = Webcam => {
		this.Webcam = Webcam;
	};

    componentDidMount = () => {
        this.getUserSession();
    }



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
    
    getFaceInfo = () => {
        console.log("Get Face Info Called");
        const Key = this.state.imageInfo.Key;
        axios
            .post('/detectFaces', { 
            Key: Key
            } )
            .then( res => {
                this.setState( {
					stepCounter: 3
                } );
                console.log("Face Info: ", res.data);
            } )
            .catch( error => console.log(error) );
    }
    
    render(){

        let stepView = () => { switch(this.state.stepCounter){
            case 0:
                return(
                <div className='add__photos'>
                    <h1 className='photo__title'>Image Info</h1>
                    <div className='photo__camera'>

                    </div>
                    <div className='photo__main__buttons'>
                        <button onClick={() => this.toggleCam()} className='take__photo'>Live Cam</button>
                    </div>
                    <div className='photo__finish__buttons'>
                        <button onClick={() => this.handleCancel()} className='photo__cancel'>Cancel</button>
                    </div>
                </div>)
            case 1:
                return(
                <div className='add__photos'>
                    <h1 className='photo__title'>Image Info</h1>
                    <div className='photo__camera'>
                            <Webcam audio={false} ref={this.webcamRef} screenshotFormat='image/jpeg' className='photo__img' /> 	
                    </div>
                    <div className='photo__main__buttons'>
                        <button onClick={() => this.capture()} className='take__photo'>Capture</button>
                    </div>
                    <div className='photo__finish__buttons'>
                        <button onClick={() => this.handleCancel()} className='photo__cancel'>Cancel</button>
                    </div>
                </div>)
            case 2:
                return(
                <div className='add__photos'>
                    <h1 className='photo__title'>Image Info</h1>
                    <div className='photo__camera'>
                        <img alt='photos' height={300} width={400}  src={this.state.webcamCapture} />  
                    </div>
                    <div className='photo__main__buttons'>
                        <button onClick={() => this.toggleCam()} className='take__photo'>Try Again</button>
                        <button onClick={() => this.sendToS3()} className='take__photo'>Accept Photo</button>
                    </div>
                    <div className='photo__finish__buttons'>
                        <button  onClick={() => this.handleCancel()} className='photo__cancel'>Cancel</button>
                    </div>
                </div>)
            case 3:
                return(
                <div className='add__photos'>
                    <h1 className='photo__title'>Image Info</h1>
                    <div className='photo__camera'>
                        <img alt='photos' height={300} width={400}  src={this.state.webcamCapture} /> 
                    </div>
                    <div className='photo__main__buttons'>
                        <button onClick={() => this.toggleCam()} className='take__photo'>Try Again</button>
                    </div>
                    <div className='photo__finish__buttons'>
                        <button onClick={() => this.handleCancel()} className='photo__cancel'>Cancel</button>
                        <button className='photo__submit' onClick={() => this.getFaceInfo()} >Analyze Photo</button>
                    </div>
                </div>)
            default: 
                return null
        } }

        return(
            <div className='photos'>
                {stepView()}
            </div>
        )
    }
}
const mapStateToProps = state => state;

export default  connect(mapStateToProps, {getUserSessionRedux})(ImageInfo);