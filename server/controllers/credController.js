
module.exports = {
    getAllUserCreds: async (req, res) => {
        console.log('Get All User Credentials Called')
        user_id = +req.params.id
        const db = req.app.get('db');
        await db.get_all_creds_user(user_id)
            .then( creds => {
                res.status(200).send(creds);
                //console.log(creds);
            } )
            .catch( error => {
                res.status(500).send( { errorMessage: "Error getting list of credentials" } );
                console.log(error);
            } )
    },

    getCred: async (req, res) => {
        const db = req.app.get('db')
        const id= +req.params.id
        console.log('req.params',req.params)
        console.log('id', id)
        db.get_credential([id]).then(cred => {
            res.status(200).send(cred)
        })
    },

    addCred: async (req, res) => {
      const db = req.app.get('db')
      const {websiteName, websiteUrl, userName, password, userId} = req.body
      const timestamp = Date.now();
      const postCred = await db.post_credentials([websiteName, websiteUrl, userName, password, userId, timestamp]) 
      console.log(postCred)
    res.status(200).send(postCred)
    },

    updateCred: async (req, res) => {
        const db = req.app.get('db')
        const {websiteName, websiteUrl, username, password, credId} = req.body
        console.log(req.body)
        db.get_credential([websiteName, websiteUrl, username, password, credId]).then(cred => {
            res.status(200).send(cred)
        })
    },

    deleteCred: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.delete_credentials(id).then(item => {
            res.status(200).send(item)
        })
    }
}