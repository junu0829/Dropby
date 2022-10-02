const { Area, Place, Drop, Comment, Emoji, Image } = require("../models");
const { getUserWithAccess } = require("../utils/auth");
const { logger } = require("../utils/winston");

exports.newArea = async (name, polygon) => {
    try {
        const area = await Area.create({
            name,
            polygon,
        });
        logger.info(`${name} area created`);
        return area;
    } catch (error) {
        logger.error(`Failed to create a new area : ${error.message}`);
        throw new Error("새 구역 정보 저장에 실패하였습니다.");
    }
};

exports.getAreas = async () => {
    try {
        const allAreas = await Area.findAll();
        logger.info(`All areas retrieved : ${allAreas.length} in total`);
        return allAreas;
    } catch (error) {
        logger.error(`Failed to retrieve all areas : ${error.message}`);
        throw new Error("전체 구역 정보 조회에 실패하였습니다.");
        // next(error);
    }
};

exports.getPlaces = async (areaPk) => {
    try {
        const places = await Place.findAll({
            where: {
                pk: areaPk,
            },
        });
        logger.info(`All places in area Id ${areaPk} retrieved : ${places.length} in total`);

        return places;
    } catch (error) {
        logger.error(`Failed to retrieve all areas in area ${areaPk} : ${error.message}`);
        throw new Error(`${areaPk}번 구역 내 전체 장소 조회에 실패하였습니다.`);
    }
};

exports.getAreaDrops = async (accessToken, areaPk) => {
    try {
        const user = await getUserWithAccess(accessToken);
        const area = await Area.findOne({
            where: {
                pk: areaPk,
            },
        });

        const areaName = area.name;

        const AreaPlaces = await Place.findAll({
            where: {
                areaPk,
            },
        });
        let allDrops = { publicDrops: [], myDrops: [] };
        for (let place of AreaPlaces) {
            let placePk = place.dataValues.pk;
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
            allDrops["publicDrops"].push(...publicDrops);
            console.log("--------------publicDrops");
            console.log(allDrops["publicDrops"]);

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
                const commentsCount = Comment.findAll({ where: { dropPk: myDrop.pk } }).length;
                if (commentsCount) {
                    myDrop.dataValues["commentsCount"] = commentsCount;
                } else {
                    myDrop.dataValues["commentsCount"] = 0;
                }
            }

            allDrops["myDrops"].push(...myDrops);
        }

        logger.info(
            `All Drops of area Id ${areaPk} retrieved : ${
                allDrops.myDrops.length + allDrops.publicDrops.length
            } in total`,
        );
        return {
            areaName: areaName,
            areaPk: areaPk,
            drops: allDrops,
            dropsCount: allDrops.myDrops.length + allDrops.publicDrops.length,
        };
    } catch (error) {
        logger.error(`Failed to getAreadrops of area ${areaPk} : ${error.message}`);
        throw new Error(`${areaPk}번 내 전체 드롭 정보 조회에 실패하였습니다.`);
    }
};
