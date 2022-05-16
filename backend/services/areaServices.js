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


exports.getAreas = async() => {
    try {
        console.log(__dirname);
        const allAreas = await Area.findAll();
        return allAreas;
    } catch(error) {
        console.log(error.message);
        next(error);
    }
}

