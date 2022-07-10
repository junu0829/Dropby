const { Place } = require("../models");

exports.getWrittenPlaceName = async (drop) => {
    const placePk = drop.placePk;
    const place = await Place.findOne({
        where:{
            pk:placePk
        }
    }); 

    const placeName = place.dataValues.name;

    return placeName;
}