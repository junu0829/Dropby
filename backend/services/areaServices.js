const { Area, Place } = require("../models");

exports.newArea = async (name, polygon) => {
    console.log(`name = ${name}`);
    console.log(polygon);
    const area = await Area.create({
        name,
        polygon
    });
    return area;
};

exports.getAreas = async(req, res, next) => {
    try {
        const allAreas = await areaServices.getAreas();
        res.status(200).json({
            'msg':'전 구역 조회 완료',
            data:allAreas
        })
    } catch(error) {
        console.log(error.message);
        next(error);
    }
}

exports.getAreas = async() => {
    try {
        const allAreas = await Area.findAll();
        return allAreas;
    } catch(error) {
        console.log(error.message);
        next(error);
    }
}

exports.getPlaces = async (areaPk) => {
    const places = await Place.findAll({
        where:{
            pk:areaPk
        }
    });

    return places;
}