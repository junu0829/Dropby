const {Emoji} = require('../models');
const { logger } = require('../utils/winston');

exports.newEmoji = async (body) => {
    try {
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
    logger.info(`New emoji ${name} added`);
    return emoji;
    } catch (error) {
        logger.error(`Failed to save a new emoji : ${error.message}`);
        throw new Error("이모지 정보 저장에 실패하였습니다.");
    }
}