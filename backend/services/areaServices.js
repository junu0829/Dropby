const { Area, Place, Drop } = require("../models");
const { getUserWithAccess } = require("../utils/auth");

exports.newArea = async (name, polygon) => {

    const area = await Area.create({
        name,
        polygon
    });
    return area;
};

exports.getAreas = async (req, res, next) => {
    try {
        const allAreas = await areaServices.getAreas();
        res.status(200).json({
            'msg': '전 구역 조회 완료',
            data: allAreas
        })
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

exports.getAreas = async () => {
    try {
        const allAreas = await Area.findAll();
        return allAreas;
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

exports.getPlaces = async (areaPk) => {
    const places = await Place.findAll({
        where: {
            pk: areaPk
        }
    });

    return places;
}

exports.getAreaDrops = async (accessToken, areaPk) => {
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
    let allDrops = { 'publicDrops': [], 'myDrops': [] };
    for (let place of AreaPlaces) {
        let placePk = place.dataValues.pk;
        let publicDrops = await Drop.findAll({
            where: {
                placePk,
                isPrivate: false,
            },
            include: ["images", "emoji", { model: Place, attributes: ['name'] }]
        });
        allDrops['publicDrops'].push(...publicDrops);

        let myDrops = await Drop.findAll({
            where: {
                placePk,
                isPrivate: true,
                creatorPk: user.pk
            },
            include: ["images", "emoji", { model: Place, attributes: ['name'] }]
        });
        allDrops['myDrops'].push(...myDrops)
    }
    return {
        areaName: areaName,
        areaPk: areaPk,
        drops: allDrops,
        dropsCount: (allDrops.myDrops.length + allDrops.publicDrops.length),
    };
};