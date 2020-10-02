import React from 'react';
import axios from 'axios';

const ImageCard = (props) => {

    var dateTime = new Date(0); 
    dateTime.setUTCSeconds(props.imageInfo.timestamp / 1000);

    const deleteImage = (id) => {
        console.log("Delete Image Called on Image: ", id);
        axios.delete(`/api/image/${id}`).then(() => {
            props.getUserImages(); 
        })
    }

    return(
        <div className="imageCard__component">
            <div className="imageCard--container">
                <div className="imageCard__title--container">
                    <h3>{dateTime.toLocaleString()}</h3>
                    <h3 onClick={() => deleteImage(props.imageInfo.img_id)} className="imageCard__title__delete" >X</h3>
                </div>
                <div className="imageCard__image--container">
                    <img className="imageCard__image" src={props.imageInfo.s3_url} alt="imageCard"/>
                </div>
                {/* <div className="imageCard__bottomLabel--container">
                    <h3>99% Matched</h3>
                </div> */}
            </div>
            
        </div>
    )
}

export default ImageCard;
