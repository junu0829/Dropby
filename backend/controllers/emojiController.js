const emojiServices = require('../services/emojiServices')

exports.newEmoji = async (req, res, next) => {
    
    try {
        const emoji = await emojiServices.newEmoji(req.body);
        res.status(201).json({
            msg: "이모지 저장 완료",
            data: emoji,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};