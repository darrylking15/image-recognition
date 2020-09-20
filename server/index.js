// Library Dependencies
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

// Controllers
const authCtrl = require('./controllers/authController');
const credCtrl = require('./controllers/credController');
const imageCtrl = require('./controllers/imageController');

// Server Setup -------------------------------------------------------------------
const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(session( {
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 },
    secret: SESSION_SECRET
} ) );

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
    }).then(dbInstance => {
        app.set('db', dbInstance);
        console.log('Connected to Database')
    })
    .catch( error => console.log(error));

// -Start- Endpoints Frontend to Backend -------------------------------------------------------------------
    // Auth Endpoints
    app.post('/auth/register', authCtrl.register); // create a new user in the database
    app.post('/auth/login', authCtrl.login); // logs in a user, and creates a session
    app.post('/auth/faceverify', authCtrl.faceVerify); // Verifies user by face
    app.delete('/auth/logout', authCtrl.logout); // logs out a user
    app.put('/auth/user/update/:id', authCtrl.updateUser); // updates user info by ID
    app.get('/auth/getsession', authCtrl.getSession); // returns session user
    
    // Cred Endpoints
    app.get('/api/creds', credCtrl.getAllUserCreds); // get all credentials of user
    app.post('/api/cred', credCtrl.addCred); // add credential
    app.post('/api/cred/:id', credCtrl.updateCred); // update credential by ID
    app.post('/api/cred/:id', credCtrl.deleteCred); // delete credential by ID
    
    // Image Endpoints
    app.get('/api/images', imageCtrl.getAllUserImages); // get all images by user
    app.post('/api/image', imageCtrl.addImage); // add image
    app.get('/api/image', imageCtrl.getImage); // get specific image
    app.put('/api/image/:id', imageCtrl.replaceImage); // replaces image by ID
    app.delete('/api/image/:id', imageCtrl.deleteImage); // deletes images by ID


// -End- Endpoints Frontend to Backend -------------------------------------------------------------------

// Need to add ability to send info to Amazon S3 and Rekognition API


// Server Run and 
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
});
    