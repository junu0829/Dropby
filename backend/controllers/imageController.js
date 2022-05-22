const { Image } = require('../models')

module.exports = {
    post: async (req, res) => {
        try {
            const image = await Image.create({
                imageUrl:req.file.location
            });
            res.status(200).json({ imageUrl: req.file.location });
        } catch(e) {
            console.log(e.message);
        }
    }
}

