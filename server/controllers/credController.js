
module.exports = {
    getAllUserCreds: async (req, res) => {
        console.log('Get All User Credentials Called')
        user_id = +req.params.id
        const db = req.app.get('db');
        await db.get_all_creds_user(user_id)
            .then( creds => {
                res.status(200).send(creds);
                console.log(creds);
            } )
            .catch( error => {
                res.status(500).send( { errorMessage: "Error getting list of credentials" } );
                console.log(error);
            } )
    },

    addCred: async (req, res) => {
      const db = req.app.get('db')
      const {websiteName, websiteUrl, userName, password} = req.body
      db.post_credentials([websiteName, websiteUrl, userName, password]).then(cred => {
          res.status(200).send(cred)
      })
    },

    updateCred: async (req, res) => {
        const db = req.app.get('db')
        const {websiteName, websiteUrl, userName, password} = req.body
        const {userId} = req.session.user
        db.edit_credentials(websiteName, websiteUrl, userName, password, userId).then(cred => {
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