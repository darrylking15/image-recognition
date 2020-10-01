import React, { useEffect, useState } from 'react'
import axios from 'axios';


const ImageInfo = (props) => {

    const [imageInfo, setImageInfo] = useState();
    const [imageURL, setImageURL] = useState("https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-12.jpg");
    //let imageInfo = {};

    useEffect( () => {
        getImageInfo();
      }, [])

    const getImageInfo = async () => {
        const imageId = 36;
        await axios
            .get(`/api/image/${imageId}`)
            .then( incomingInfo => {
                setImageInfo(incomingInfo.data[0]);
                setImageURL(incomingInfo.data[0].s3_url);
            } )
            .catch( error => console.log(error) )
    }

    return(
        <div className="imageCard__component">
            <img src={imageURL} alt="#"/>
            <p>{JSON.stringify(imageInfo)}</p>
        </div>
    )
}

export default ImageInfo;