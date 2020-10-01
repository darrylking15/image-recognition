import React, { Component } from 'react';
import Webcam from 'react-webcam';
import store from '../../redux/store';
import { connect } from 'react-redux';
import { getUserSessionRedux } from '../../redux/reducer';
import axios from 'axios';

import './Photos.css'

class Photos extends Component{
    constructor(){
        super()

        const reduxState = store.getState();

        this.state = {
            stepCounter: 0,
            startCam: false,
            toggleCamToImage: false,
            webcamCapture: '',
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

    componentDidMount = () => {
        this.getUserSession();
    }

    // componentDidUpdate() {
	// 	if (!this.state.user.userId) {
	// 		try {
    //             console.log("Session User Not Found, trying to get user on session")
    //             this.getUserSession();
    //         } catch {
    //             console.log("No User on Session, Pushing to Dashboard")
    //         }
    //     }
    // }
    
 
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

    getUpdatedUserInfo = async () => {
        console.log("Get Updated User Info Called")
        const id = this.state.user.userId;
        await axios
            .get(`/auth/userinfo/${id}`)
            .then( res => {
                console.log("Photos Update User from DB", res.data);
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

    capture = () => {
        console.log("Capture Called");
		try {
            const imageSrc = this.Webcam.getScreenshot( { width: 600, height: 480 } );
		    this.setState( {webcamCapture: imageSrc, toggleCamToImage: true, stepCounter: 2} )
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



    indexPhoto = () => {
        console.log("Index Photo Called");
        const userId = this.state.user.userId;
        const imageInfo = this.state.imageInfo; 
        const webcamCapture = this.state.webcamCapture; 
        console.log("Image Info: ", imageInfo)
        axios
            .put('/indexFaces', { 
            userId: userId,
            imageInfo: imageInfo,
            base64: webcamCapture
            } )
            .then( data => {
                console.log('Index Faces Return Data', data);
                this.getUpdatedUserInfo();
            } )
            .catch( error => console.log(error) );
           console.log("Indexing Photo for User: ", userId); 
        this.props.history.push('/dashboard');
    }

    handleCancel = () => {
        console.log("Cancel Photo Called");
        this.props.history.push('/dashboard');
    }

    render(){

        let stepView = () => { switch(this.state.stepCounter){
            case 0:
                return(
                <div className='add__photos'>
                    <h1 className='photo__title'>Face Input</h1>
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
                    <h1 className='photo__title'>Face Input</h1>
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
                    <h1 className='photo__title'>Face Input</h1>
                    <div className='photo__camera'>
                        <img alt='photos' height={300} width={400}  src={this.state.webcamCapture} />  
                    </div>
                    <div className='photo__main__buttons'>
                        <button onClick={() => this.toggleCam()} className='take__photo'>Try Again</button>
                        <button onClick={() => this.sendToS3()} className='take__photo'>Accept & Save</button>
                    </div>
                    <div className='photo__finish__buttons'>
                        <button  onClick={() => this.handleCancel()} className='photo__cancel'>Cancel</button>
                    </div>
                </div>)
            case 3:
                return(
                <div className='add__photos'>
                    <h1 className='photo__title'>Face Input</h1>
                    <div className='photo__camera'>
                        <img alt='photos' height={300} width={400}  src={this.state.webcamCapture} /> 
                    </div>
                    <div className='photo__main__buttons'>
                        <button onClick={() => this.toggleCam()} className='take__photo'>Try Again</button>
                    </div>
                    <div className='photo__finish__buttons'>
                        <button onClick={() => this.handleCancel()} className='photo__cancel'>Cancel</button>
                        <button className='photo__submit' onClick={() => this.indexPhoto()} >Submit</button>
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

export default connect(mapStateToProps, { getUserSessionRedux })(Photos);