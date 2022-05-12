const { Place, Area } = require("../models");

exports.newPlace = async (body) => {
    const { name, latitude, longitude } = body;

    const place = await Place.create({
        name,
        latitude,
        longitude,
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