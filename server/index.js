// Library Dependencies
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const multer = require('multer'); 
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');

// Controllers
const authCtrl = require('./controllers/authController');
const credCtrl = require('./controllers/credController');
const imageCtrl = require('./controllers/imageController');
const { Console } = require('console');

// Server Setup -------------------------------------------------------------------
const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(session( {
    resave: false,
    saveUninitialized: false,
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
    app.get('/api/creds/:id', credCtrl.getAllUserCreds); // get all credentials of user
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

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
}); 

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
}); 

const upload = multer({storage}).single('image');

app.post('/upload',upload,(req, res) => {

    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}.${fileType}`,
        Body: req.file.buffer
    }
        console.log(req.file)
    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error) 
        }

        res.status(200).send(data)
    })
})

// Server Run and 
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
});
    