
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

    },

    updateCred: async (req, res) => {

    },

    deleteCred: async (req, res) => {

    }
}