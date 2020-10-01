import React from 'react'

const ImageCard = (props) => {



    return(
        <div className="imageCard__component">
            <img src={props.imageInfo.s3_url}/>
        </div>
    )
}

export default ImageCard;
