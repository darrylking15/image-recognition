require('dotenv').config();
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');
//const creds = require('./creds.json')

//const { source, target } = require('./photoData');


//const { AWS_ID, AWS_SECRET, AWS_BUCKET_NAME, AWS_COLLECTION_ID, AWS_REGION } = process.env;


module.exports = {
    compareFaces: (req,res) => {
        const db = req.app.get('db');
        console.log(" Start Logging Face"); 
        const AWS = require('aws-sdk')
        const bucket        = 'bucket' // the bucketname without s3://
        const photo_source  = 'source.jpg'
        const photo_target  = 'target.jpg'
        const config = new AWS.Config({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })
      
        const client = new AWS.Rekognition();
        const params = {
            SourceImage: {
                S3Object: {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Name: "new.jpg"
                },
            },
            TargetImage: {
                S3Object: {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Name: "pictest.jpg"
                },
            },
            SimilarityThreshold: 70
        }
        client.compareFaces(params, function(err, response) {
            if (err) {
            console.log(err, err.stack); // an error occurred
            } else {
            response.FaceMatches.forEach(data => {
                let position   = data.Face.BoundingBox
                let similarity = data.Similarity
                console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
            }) // for response.faceDetails
            } // if
        });
    } , 

    indexFaces: (req, res) => {
        const rekognition = new AWS.Rekognition();
        const config = new AWS.Config({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })
        var params = {
            CollectionId: "imagerekfaces", 
            DetectionAttributes: [
            ], 
            
            Image: {
             S3Object: {
              Bucket: process.env.AWS_BUCKET_NAME, 
              Name: "download.jpeg"
             }
            }
           };
           rekognition.indexFaces(params, function(err, data) {
             if (err) console.log(err, err.stack); // an error occurred
             else     console.log(data);           // successful response
           
            }) // for response.faceDetails
        } , 
        
        upload64S3: (req, res) => {
            const s3 = new AWS.Config({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION
            })

            // console.log(req.body)
            var s3Bucket = new AWS.S3( { params: {Bucket: 'imagerek2020', 
            Key: "test.jpg"         } } );
            const buf = Buffer.from(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
            const fileType = "jpg"
            var params = {
                Key: `${uuidv4()}.${fileType}`, 
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg'
            };

            s3Bucket.upload(params, (error, data) => {
                if(error){
                    res.status(500).send(error) 
                }
        
                res.status(200).send(data)
                
            })
           
           
        },

        savePhoto: async (req, res) => {
            console.log('Post Image Called');
            const db = req.app.get('db');
            const { s3Url, s3Bucket, s3Key, imgBase64,   } = req.body; 

        }
                        
        
}
    