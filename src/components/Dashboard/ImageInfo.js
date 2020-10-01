
import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store';
import { connect } from 'react-redux';
//import { render } from 'node-sass';




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

    // componentDidMount = () => {
    //     this.getUserSession();
    // }

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
	

    detectFaces = async () => {
        console.log("Detect Faces. ");
         axios
            .post('/detectFaces', {
                Key: this.state.imageInfo.Key
            })
            
    }


    
    render(){
        console.log(this.props)
        return(
            <div>
                 <p>Hello</p>
            </div>
        )
    }
}
const mapStateToProps = state => state;


export default  connect(mapStateToProps)(ImageInfo);