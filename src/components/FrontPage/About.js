import React from 'react';
import JavaScriptLogo from './About Icons/Javascript_Logo_v3.png';
import ReactLogo from './About Icons/React_Logo.png';
import NodeJSLogo from './About Icons/Node_JS_Logo.png';
import SassLogo from './About Icons/Sass_Logo_v2.png';
import AWSLogo from './About Icons/aws_logo.png';
import AWSRekLogo from './About Icons/Amazon_Rek_Logo.png';
import AWSS3Logo from './About Icons/Amazon_S3_Logo.png';

function About() {
    return(
        <div className="About__Component">
            <div className="About__Title">Created using:</div>
            <div className="About__Icons__List">
                <img src={ReactLogo} className="About__Icons"/>
                <img src={JavaScriptLogo} className="About__Icons"/>
                <img src={NodeJSLogo} className="About__Icons"/>
                <img src={SassLogo} className="About__Icons"/>
                <img src={AWSLogo} className="About__Icons"/>
                <img src={AWSRekLogo} className="About__Icons"/>
                <img src={AWSS3Logo} className="About__Icons"/>
            </div>
        </div>
    )
}

export default About;