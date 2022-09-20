const { Drop, Image, Emoji, LikeDrop, Place, Comment } = require("../models");
const { getUserWithAccess } = require("../utils/auth");
const { getWrittenPlaceName } = require("../utils/place");
const { logger } = require("../utils/winston");

exports.newDrop = async (accessToken, body, files, placePk) => {
    try {
        const user = await getUserWithAccess(accessToken);
        let { title, content, emojiSlug, isPrivate } = body;
        isPrivate = isPrivate === "true";

        const emoji = await Emoji.findOne({
            where: {
                slug: emojiSlug,
            },
        });

        const drop = await Drop.create({
            title,
            content,
            createdAt: Date(),
            creatorPk: user.pk,
            placePk,
            emojiPk: emoji.pk,
            isPrivate,
        });
        if (files) {
            for (let image of files) {
                const drop_image = await Image.create({
                    imageUrl: image.location,
                    dropPk: drop.pk,
                });
            }
        }
        if (files) {
            logger.info(`Drop created : ${title}, ${content} with image files`);
        }
        logger.info(`Drop created : ${title}, ${content} with no image files`);
        return drop;
    } catch (error) {
        logger.error(`Failed to create a new drop : ${error.message}`);
        throw new Error(`드롭 작성에 실패하였습니다.`);
    }
};

exports.getDrops = async (accessToken, placePk) => {
    try {
        const publicDrops = await Drop.findAll({
            where: {
                placePk,
                isPrivate: false,
            },
            include: [
                { model: Image, attributes: ["imageUrl"] },
                { model: Emoji, attributes: ["name", "icon"] },
                { model: Place, attributes: ["name"] },
            ],
        });

        for (let publicDrop of publicDrops) {
            const commentsCount = (await Comment.findAll({ where: { dropPk: publicDrop.pk } }))
                .length;
            if (commentsCount) {
                publicDrop.dataValues["commentsCount"] = commentsCount;
            } else {
                publicDrop.dataValues["commentsCount"] = 0;
            }
        }
        const user = await getUserWithAccess(accessToken);

        const myDrops = await Drop.findAll({
            where: {
                placePk,
                isPrivate: true,
                creatorPk: user.pk,
            },
            include: [
                { model: Image, attributes: ["imageUrl"] },
                { model: Emoji, attributes: ["name", "icon"] },
                { model: Place, attributes: ["name"] },
            ],
        });

        for (let myDrop of myDrops) {
            const commentsCount = (await Comment.findAll({ where: { dropPk: myDrop.pk } })).length;
            if (commentsCount) {
                myDrop.dataValues["commentsCount"] = commentsCount;
            } else {
                myDrop.dataValues["commentsCount"] = 0;
            }
        }

        const writtenPlace = await getWrittenPlaceName(publicDrops[0]);
        const dropsCount = publicDrops.length + myDrops.length;

        logger.info(
            `All Drops of place Id ${placePk} retrieved : ${
                publicDrops.length + myDrops.length
            } in total`,
        );
        return {
            writtenPlace,
            dropsCount,
            publicDrops,
            myDrops,
        };
    } catch (error) {
        logger.error(`Failed to retrieve all Drops of place Id ${placePk} : ${error.message}`);
        throw new Error(`${placePk}번 장소 내 전체 드롭 조회에 실패하였습니다.`);
    }
};
exports.getPublicDrops = async (accessToken, placePk) => {
    try {
        const publicDrops = await Drop.findAll({
            where: {
                placePk,
                isPrivate: false,
            },
            include: [
                { model: Image, attributes: ["imageUrl"] },
                { model: Emoji, attributes: ["name", "icon"] },
                { model: Place, attributes: ["name"] },
            ],
        });

        const writtenPlace = await getWrittenPlaceName(publicDrops[0]);
        const dropsCount = publicDrops.length;
        logger.info(`All public drops of place Id ${placePk} retrieved : ${dropsCount} in total`);
        return {
            writtenPlace,
            dropsCount,
            publicDrops,
        };
    } catch (error) {
        logger.error(`Failed to retrieve public drops of place Id ${placePk} : ${erorr.message}`);
        throw new Error(`${placePk}번 장소 내 public 드롭 조회에 실패하였습니다.`);
    }
};

exports.getMyDrops = async (accessToken, placePk) => {
    try {
        const user = await getUserWithAccess(accessToken);

        const myDrops = await Drop.findAll({
            where: {
                placePk,
                isPrivate: true,
                creatorPk: user.pk,
            },
            include: [
                { model: Image, attributes: ["imageUrl"] },
                { model: Emoji, attributes: ["name", "icon"] },
                { model: Place, attributes: ["name"] },
            ],
        });

        const writtenPlace = await getWrittenPlaceName(myDrops[0]);
        const dropsCount = myDrops.length;
        logger.info(`All my drops of place Id ${placePk} retrieved : ${dropsCount} in total`);
        return {
            writtenPlace,
            dropsCount,
            myDrops,
        };
    } catch (error) {
        logger.error(`Failed to retrieve my drops of place Id ${placePk} : ${error.message}`);
        throw new Error(`${placePk}번 장소 내 전체 my 드롭 조회에 실패하였습니다.`);
    }
};

exports.updateDrop = async (body, files, dropPk) => {
    try {
        const { title, content } = body;
        const drop = await Drop.findOne({
            where: {
                pk: dropPk,
            },
        });

        drop.set({
            title: title,
            content: content,
        });
        await drop.save();
        Image.destroy({
            where: {
                dropPk: drop.pk,
            },
        });
        if (files) {
            for (let image of files) {
                const drop_image = await Image.create({
                    imageUrl: image.location,
                    dropPk: drop.pk,
                });
            }
        }
        // s3에서 이미지 삭제하는 로직 필요할까?
        logger.info(`Drop updated : ${title} -  ${content}`);
        return drop;
    } catch (error) {
        logger.error(`Failed to update drop Id ${dropPk} : ${error.message}`);
        throw new Error(`드롭 수정에 실패했습니다.`);
    }
};

exports.deleteDrop = async (dropPk) => {
    try {
        const drop = await Drop.findOne({
            where: {
                pk: dropPk,
            },
        });

        await drop.destroy();
        logger.info(`Drop Id ${dropPk} deleted`);
        return true;
    } catch (error) {
        logger.error(`Failed to delete drop Id ${dropPk} : ${error.message}`);
        throw new Error("드롭 삭제에 실패했습니다.");
    }
};

exports.getDrop = async (accessToken, dropPk) => {
    try {
        const drop = await Drop.findOne({
            where: {
                pk: dropPk,
            },
            include: ["emoji", "images", { model: Place, attributes: ["name"] }],
        });

        const user = await getUserWithAccess(accessToken);

        const dropLiked = await LikeDrop.findAll({
            where: {
                DropPk: dropPk,
                UserPk: user.pk,
            },
        });
        const writtenPlace = await getWrittenPlaceName(drop);

        if (dropLiked.length > 0) {
            logger.info(`One drop of place Id ${dropPk} retrieved`);
            return {
                writtenPlace: writtenPlace,
                drop: drop,
                isLiked: true,
            };
        }
        logger.info(`One drop of place Id ${dropPk} retrieved`);
        return {
            writtenPlace: writtenPlace,
            drop: drop,
            isLiked: false,
        };
    } catch (error) {
        logger.error(`Failed to retrieve one drop of place Id ${placePk} : ${error.message}`);
        throw new Error("단일 드롭 정보 조회에 실패했습니다.");
    }
};

exports.toggleDropLike = async (accessToken, dropPk) => {
    try {
        const user = await getUserWithAccess(accessToken);

        const likeDrop = await LikeDrop.findOne({
            where: {
                dropPk: dropPk,
                userPk: user.pk,
            },
        });

        const drop = await Drop.findOne({
            where: {
                pk: dropPk,
            },
        });

        if (likeDrop) {
            drop.set({
                likesCount: drop.likesCount - 1,
            });

            await drop.save();
            await likeDrop.destroy();
            logger.info(`User ${user.nickname} toggled OFF drop Id ${dropPk}`);
            return "OFF";
        }
        drop.set({
            likesCount: drop.likesCount + 1,
        });

        await drop.save();

        const dropLiked = await LikeDrop.create({
            DropPk: dropPk,
            UserPk: user.pk,
        });
        logger.info(`User ${user.nickname} toggled ON drop Id ${dropPk}`);
        return "ON";
    } catch (error) {
        logger.error(
            `User ${user.nickname} failed to toggle likeComment Id ${commentPk} : ${error.message}`,
        );
        throw new Error("드롭 좋아요 등록/해제에 실패하였습니다.");
    }
};
