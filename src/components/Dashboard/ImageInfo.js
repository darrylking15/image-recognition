
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
                user: reduxState.user,
                faceInfo: {}
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
                    stepCounter: 4,
                    faceInfo: res.data
                } );
                console.log("Face Info: ", res.data);
            } )
            .catch( error => console.log(error) );
    }
    
    handleCancel = () => {
        console.log("Cancel Photo Called");
        this.props.history.push('/dashboard');
    }

    render(){

        let faceInfo = this.state.faceInfo;

        let stepView = () => { switch(this.state.stepCounter){
            case 0:
                return(
                <div className='imageInfo__add__photos'>
                    <h1 className='imageInfo__photo__title'>Face Analyzer</h1>
                    <div className='imageInfo__photo__camera'>
                    </div>
                    <div className='imageInfo__photo__main__buttons'>
                        <button onClick={() => this.handleCancel()} className='imageInfo__photo__cancel'>Cancel</button>
                        <button onClick={() => this.toggleCam()} className='imageInfo__take__photo'>Live Cam</button>
                    </div>
                </div>)
            case 1:
                return(
                <div className='imageInfo__add__photos'>
                    <h1 className='imageInfo__photo__title'>Face Analyzer</h1>
                    <div className='imageInfo__photo__camera'>
                        <Webcam audio={false} ref={this.webcamRef} screenshotFormat='image/jpeg' className='imageInfo__photo__img' /> 	
                    </div>
                    <div className='imageInfo__photo__main__buttons'>
                        <button onClick={() => this.handleCancel()} className='imageInfo__photo__cancel'>Cancel</button>
                        <button onClick={() => this.capture()} className='imageInfo__take__photo'>Capture</button>
                    </div>
                </div>)
            case 2:
                return(
                <div className='imageInfo__add__photos'>
                    <h1 className='imageInfo__photo__title'>Face Analyzer</h1>
                    <div className='imageInfo__photo__camera'>
                        <img alt='photos' className='imageInfo__photo__img' src={this.state.webcamCapture} />  
                    </div>
                    <div className='imageInfo__photo__main__buttons'>
                        <button  onClick={() => this.handleCancel()} className='imageInfo__photo__cancel'>Cancel</button>
                        <button onClick={() => this.toggleCam()} className='imageInfo__take__extra'>Try Again</button>
                        <button onClick={() => this.sendToS3()} className='imageInfo__take__photo'>Accept Photo</button>
                    </div>
                    {/* <div className='imageInfo__photo__finish__buttons'>
                    </div> */}
                </div>)
            case 3:
                return(
                <div className='imageInfo__add__photos'>
                    <h1 className='imageInfo__photo__title'>Face Analyzer</h1>
                    <div className='imageInfo__photo__camera'>
                        <img alt='photos' className='imageInfo__photo__img' src={this.state.webcamCapture} /> 
                    </div>
                    <div className='imageInfo__photo__main__buttons'>
                        <button onClick={() => this.handleCancel()} className='imageInfo__photo__cancel'>Cancel</button>
                        <button onClick={() => this.toggleCam()} className='imageInfo__take__extra'>Try Again</button>
                        <button className='imageInfo__take__photo' onClick={() => this.getFaceInfo()} >Analyze Photo</button>
                    </div>
                    {/* <div className='imageInfo__photo__finish__buttons'>
                    </div> */}
                </div>)
            case 4:
                return(
                <div className='imageInfo__add__photos'>
                    <h1 className='imageInfo__photo__title'>Face Info</h1>
                    <div className='imageInfo__photo__camera'>
                        <img alt='photos' className='imageInfo__photo__img' src={this.state.webcamCapture} /> 
                    </div>
                    <div className='imageInfo__photo__main__buttons'>
                        <button onClick={() => this.handleCancel()} className='imageInfo__photo__cancel'>Cancel</button>
                        <button onClick={() => this.toggleCam()} className='imageInfo__take__photo'>Try Again</button>
                    </div>
                    <div className="faceInfo--container">
                        <div className="faceInfo__gender">
                            <h5 className="faceInfo__title">Gender:</h5>
                            <p>{`-${faceInfo.Gender.Value}: ${Math.trunc(faceInfo.Gender.Confidence)}%`}</p>
                        </div>
                        <div className="faceInfo__age">
                            <h5 className="faceInfo__title">Age:</h5>
                            <p>{`-Low: ${faceInfo.AgeRange.Low} `}</p>
                            <p>{`-High: ${faceInfo.AgeRange.High} `}</p>
                        </div>
                        <div className="faceInfo__eyes">
                            <h5 className="faceInfo__title">Eyes:</h5>
                            <p>{`-EyesOpen: ${faceInfo.EyesOpen.Value}  ${Math.trunc(faceInfo.EyesOpen.Confidence)}%`}</p>
                            <p>{`-Eyeglasses: ${faceInfo.Eyeglasses.Value}  ${Math.trunc(faceInfo.Eyeglasses.Confidence)}%`}</p>
                            <p>{`-Sunglasses: ${faceInfo.Sunglasses.Value}  ${Math.trunc(faceInfo.Sunglasses.Confidence)}%`}</p>
                        </div>
                        <div className="faceInfo__mouth">
                            <h5 className="faceInfo__title">Mouth:</h5>
                            <p>{`-Smile: ${faceInfo.Smile.Value}  ${Math.trunc(faceInfo.Smile.Confidence)}%`}</p>
                            <p>{`-MouthOpen: ${faceInfo.MouthOpen.Value}  ${Math.trunc(faceInfo.MouthOpen.Confidence)}%`}</p>
                            <p>{`-Mustache: ${faceInfo.Mustache.Value}  ${Math.trunc(faceInfo.Mustache.Confidence)}%`}</p>
                            <p>{`-Beard: ${faceInfo.Beard.Value}  ${Math.trunc(faceInfo.Beard.Confidence)}%`}</p>
                        </div>
                        <div className="faceInfo__emotions">
                            <h5 className="faceInfo__title">Emotions:</h5>
                            <p>{`-${faceInfo.Emotions[0].Type}  ${Math.trunc(faceInfo.Emotions[0].Confidence)}%`}</p>
                            <p>{`-${faceInfo.Emotions[1].Type}  ${Math.trunc(faceInfo.Emotions[1].Confidence)}%`}</p>
                            <p>{`-${faceInfo.Emotions[2].Type}  ${Math.trunc(faceInfo.Emotions[2].Confidence)}%`}</p>
                            <p>{`-${faceInfo.Emotions[3].Type}  ${Math.trunc(faceInfo.Emotions[3].Confidence)}%`}</p>
                            <p>{`-${faceInfo.Emotions[4].Type}  ${Math.trunc(faceInfo.Emotions[4].Confidence)}%`}</p>
                            <p>{`-${faceInfo.Emotions[5].Type}  ${Math.trunc(faceInfo.Emotions[5].Confidence)}%`}</p>
                            <p>{`-${faceInfo.Emotions[6].Type}  ${Math.trunc(faceInfo.Emotions[6].Confidence)}%`}</p>
                            <p>{`-${faceInfo.Emotions[7].Type}  ${Math.trunc(faceInfo.Emotions[7].Confidence)}%`}</p>
                        </div>
                    </div>
                </div>)
            default: 
                return null
        } }


        return(
            <div className='imageInfo__component'>
                {stepView()}
            </div>
        )
    }
}
const mapStateToProps = state => state;

export default  connect(mapStateToProps, {getUserSessionRedux})(ImageInfo);

