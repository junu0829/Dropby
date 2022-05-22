const {Emoji} = require('../models');

exports.newEmoji = async (body) => {

    const {
        icon,
        skin_tone_support,
        name,
        slug,
        unicode_version,
        emoji_version
    } = body;

    const emoji = Emoji.create({
        icon,
        skinToneSupport:skin_tone_support,
        name,
        slug,
        unicode_version,
        emoji_version
    })

    return emoji;
}