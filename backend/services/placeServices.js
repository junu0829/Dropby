const { Place, Area, Drop } = require("../models");

exports.newPlace = async (body, areaPk) => {
    const { name, latitude, longitude, address } = body;

    const place = await Place.create({
        name,
        latitude,
        longitude,
        address,
        areaPk
    });
    return place;
};


exports.getPlace = async (placePk) => {
    const place = await Place.findOne({
        where:{
            pk:placePk
        }
    });

    return place;
}

exports.getPlaces = async (areaPk) => {
    const area = await Area.findOne({
        where:{
            pk:areaPk
        }
    });
    const areaName = area.name;
    const places = await Place.findAll({
        where:{
            areaPk
        }
    });

    return {'areaName':areaName, 'places':places};
}

exports.getAreaDrops = async (areaPk) => {
    const area = await Area.findOne({
        where:{
            pk:areaPk
        }
    });
    const areaName = area.name;

    const AreaPlaces = await Place.findAll({
        where:{
            areaPk
        }
    });

    let allDrops = []
    for (let place of AreaPlaces) {
        let placePk = place.dataValues.pk;
        let drops = await Drop.findAll({
            where: {
                placePk
            }
        })
        if (drops.length > 0) {
            allDrops.push(...drops);
        }
    }
    return {
        'areaName':areaName,
        'areaPk':areaPk,
        'drops':allDrops
    }
}