
module.exports = {
    getAllUserImages: async (req, res) => {
        console.log('Get All User Images Called')
        user_id = +req.params.id
        const db = req.app.get('db');
        await db.get_all_images_user(user_id)
            .then( images => {
                res.status(200).send(images);
            } )
            .catch( error => {
                res.status(500).send( { errorMessage: "Error getting list of images" } );
                console.log(error);
            } )
    },
    
    getImage: async (req, res) => {
        console.log('Get Image Called')
        img_id = +req.params.id
        const db = req.app.get('db');
        await db.get_image(img_id)
            .then( image => {
                res.status(200).send(image);
            } )
            .catch( error => {
                res.status(500).send( { errorMessage: "Error getting image" } );
                console.log(error);
            } )
    },

    deleteImage: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        await db.delete_image(id).then(item => {
            res.status(200).send(item)
        })
    },

    addImage: async (req, res) => {

    },


    replaceImage: async (req, res) => {

    }

    
}