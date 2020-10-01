const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        console.log("Register Called");
        const db = req.app.get('db');
        let { email, password, firstName, lastName, faceRec, isAdmin } = req.body;
        const timestamp = Date.now();
        const existingUser = await db.check_for_user([email]);
        if (existingUser[0]) {
            console.log("Register Failed Duplicate");
            return res.status(409).send('Username Already Registered');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await db.register_user( 
            [timestamp, email, hash, firstName, lastName, faceRec, isAdmin] );
        //console.log('New User: ', user);
        req.session.user = {
            userId:       user[0].user_id,
            email:        user[0].email,
            firstName:    user[0].first_name,
            lastName:     user[0].last_name,
            faceRec:      user[0].face_rec,
            isAdmin:      user[0].is_admin,
            faceId:       user[0].face_id,
            faceUrl:      user[0].face_url,
            faceBucket:   user[0].face_bucket,
            faceKey:      user[0].face_key,
            faceBase64:   user[0].face_base64,
            faceMetaData: user[0].face_metadata
        }
        res.status(200).send(req.session.user);
    },

    login: async (req, res) => {
        console.log("Login Called");
        const db = req.app.get('db');
        let { email, password } = req.body;
        const user = await db.check_for_user([email]);
        if (!user[0]) {
            return res.status(404).send('Username does not exist');
        } else {
            const authenticated = bcrypt.compareSync( password, user[0].hash )
            //console.log("Logged In User: ", user[0])
            if (authenticated) {
                req.session.user = {
                    userId:       user[0].user_id,
                    email:        user[0].email,
                    firstName:    user[0].first_name,
                    lastName:     user[0].last_name,
                    faceRec:      user[0].face_rec,
                    isAdmin:      user[0].is_admin,
                    faceId:       user[0].face_id,
                    faceUrl:      user[0].face_url,
                    faceBucket:   user[0].face_bucket,
                    faceKey:      user[0].face_key,
                    faceBase64:   user[0].face_base64,
                    faceMetaData: user[0].face_metadata
                }
                console.log(`Login Successful User: ${email}`);
                res.status(200).send(req.session.user)
            } else {
                res.status(403).send('Username or Password Incorrect');
            }
        }
    },

    getUserInfo: async (req, res) => {
        console.log("Get User Info Called");
        const db = req.app.get('db');
        userId = +req.params.id
        const user = await db.get_user_info([userId]);
        if (!user[0]) {
            return res.status(404).send('User does not exist');
        } else {
            req.session.user = {
                userId:       user[0].user_id,
                email:        user[0].email,
                firstName:    user[0].first_name,
                lastName:     user[0].last_name,
                faceRec:      user[0].face_rec,
                isAdmin:      user[0].is_admin,
                faceId:       user[0].face_id,
                faceUrl:      user[0].face_url,
                faceBucket:   user[0].face_bucket,
                faceKey:      user[0].face_key,
                faceBase64:   user[0].face_base64,
                faceMetaData: user[0].face_metadata
            }
            console.log(`User Info Updated For: ${user[0].email}`);
            res.status(200).send(req.session.user)
            }
    },

    logout: async (req, res) => {
        console.log("Logout Called");
        req.session.destroy();
        res.status(200).send("Logout Successful");
        console.log(req.session);
    },

    updateUser: async (req, res) => {

    },

    getSession: async (req, res) => {
        console.log("Get User Session Called");
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send("No User Logged In")
        }
    }
}