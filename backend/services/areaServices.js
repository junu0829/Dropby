const { Area } = require("../models");

exports.newArea = async (name, polygon) => {
    
    const area = await Area.create({
        name,
        polygon
    });
    return area;
};


exports.getPlaces = async (areaPk) => {
    const places = await Place.findAll({
        where:{
            pk:areaPk
        }
    });

    return places;
}