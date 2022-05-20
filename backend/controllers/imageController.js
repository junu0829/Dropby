const { Image } = require('../models')

module.exports = {
    post: async (req, res) => {
        try {
            const image = await Area.create({
                image_url:req.file.location
            });
            res.status(200).json({ img: req.file.location });
        } catch(e) {
            console.log(e.message);
        }
    }
}