require('dotenv').config();
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');


//const { AWS_ID, AWS_SECRET, AWS_BUCKET_NAME, AWS_COLLECTION_ID, AWS_REGION } = process.env;


module.exports = {
    compareFaces: (req,res) => {
        const db = req.app.get('db');
        console.log(" Start Logging Face"); 
        let rekResponse = {fake: 'fake'};
        
        const config = new AWS.Config({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })
      
        const rekognition = new AWS.Rekognition();
        
        const {faceKey, Key} = req.body; 

        const params = {
            SourceImage: {
                S3Object: {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Name: faceKey
                },
            },
            TargetImage: {
                S3Object: {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Name: Key
                },
            },
            SimilarityThreshold: 70
        }
        rekognition.compareFaces(params, function(err, response) {
            if (err) {
            console.log(err, err.stack); // an error occurred
            } else {
            response.FaceMatches.forEach(data => {
                let position   = data.Face.BoundingBox
                let similarity = data.Similarity
                console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
            }) 
            } 
            console.log(response);
            res.status(200).send(response);
        });
        //console.log("RekResponse", rekResponse);
    } , 

    indexFaces:  (req, res) => {
        const rekognition = new AWS.Rekognition();
        var rekReturn = {};
        const {userId, imageInfo, base64} = req.body; 
        const {ETag, Location, Bucket, Key} = imageInfo;
        const timestamp = Date.now()
        var params = {
            CollectionId: "imagerekfaces",  
            Image: {
             S3Object: {
              Bucket: 'imagerek2020', 
              Name: Key
             }
            }
           };
           

           rekognition.indexFaces(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } // an error occurred
            else {
                //console.log("Rek Response: ", data); 
                //console.log("Rek Response FaceRecords: ", data.FaceRecords); 
                //console.log("Rek Response FaceRecords.Face: ", data.FaceRecords[0].Face); 
                console.log("Rek Response FaceRecords.Face: ", data.FaceRecords[0].Face); 
                console.log("Rek Response FaceRecords.Face.FaceId: ", data.FaceRecords[0].Face.FaceId)
                const faceId = data.FaceRecords[0].Face.FaceId;
                //const idOfUser = userId; 
                const db = req.app.get('db');
                db.set_user_face( [ Bucket, faceId, Location, Key, ETag, base64, data, userId ] );

            }              // successful response
            rekReturn = {...data};
           })
           //const db = req.app.get('db');
           console.log( "Index Faces Res:", res.data );
           console.log( "Rek Return :", rekReturn );
    //        const imgKey = await db.post_image( [ userId, timestamp, Location, Bucket, Key, timestamp ] )
    //        console.log("ImageKey: ", imgKey);

    //        res.status(200).send({ 
    //            imageInfo: data,
    //            imgId: imgKey[0].img_id,
    //            timestamp: timestamp
    }

, 
        
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
            console.log("Post UserId", req.body.userId);
            const userId = req.body.userId;
            var params = {
                Key: `${uuidv4()}.${fileType}`, 
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg'
            };

            s3Bucket.upload(params, async (error, data) => {
                if(error){
                    res.status(500).send(error) 
                }
                //Save to Database
                const db = req.app.get('db');
                const {ETag, Location, Key, Bucket} = data;
                const timestamp = Date.now();
                const imgKey = await db.post_image( [ userId, timestamp, Location, Bucket, Key, timestamp ] )
                console.log("ImageKey: ", imgKey);

                res.status(200).send({ 
                    imageInfo: data,
                    imgId: imgKey[0].img_id,
                    timestamp: timestamp
                 })
            })     
        },

        setProfileImage: async (req, res) => {
            console.log('Set Profile Image Called');
            const db = req.app.get('db');
            const { userId, imgId } = req.body; 
            const userProfileId = await db.set_profile_img( [ userId, imgId ] ); 
            console.log("New Profile ID: ", userProfileId);
            const updatedUser = await db.set_user_profile( [ userId, userProfileId[0].profile_id, userId ] )  
            console.log("Updated User", updatedUser);
            res.status(200).send("added profile pic");
        }



    }
       