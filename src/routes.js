import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Credentials from './components/Dashboard/Credentials'
import Photos from './components/Dashboard/Photos'
import FaceVerify from './components/FrontPage/FaceVerify'
import Login from './components/FrontPage/Login'
import Register from './components/Register/Register'
import EditCredentials from './components/Dashboard/EditCredentials'
import ImageList from './components/Dashboard/ImageList';
import ImageInfo from './components/Dashboard/ImageInfo';

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/Register' component={Register} />
        <Route path='/FaceVerify' component={FaceVerify} />
        <Route path='/Dashboard' component={Dashboard} />
        <Route path='/EditCredentials/:credId' component={EditCredentials} />
        <Route path='/Credentials' component={Credentials} />
        <Route path='/Photos' component={Photos} />
        <Route path='/ImageList' component={ImageList} />
        <Route path='/Image/:imageid' component={ImageInfo} />
    </Switch>
)