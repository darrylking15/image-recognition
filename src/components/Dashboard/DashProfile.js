import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class DashProfile extends Component {
    constructor(){
        super()
        this.state = {
            dashProfileInfo: []
        }
    }

    componentDidMount() {
        // this.getUserProfileInfo()
    }

    async getUserProfileInfo() {
        const response = await axios.get(``)
        this.setState({dashProfileInfo: response.data})
    }

    render(){
        const userMappedProfile = this.state.dashProfileInfo.map((e) => {
            return(
                <div>
                    <div>
                        <div>Profile Image</div>
                        <div>Email</div>
                    </div>
                </div>
            )
        });
        return(
            <div>
                {userMappedProfile}
            </div>
        )
    }
}

export default withRouter(DashProfile);