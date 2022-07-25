const { Place, Area, Drop } = require("../models");
const { getUserWithAccess } = require("../utils/auth");

exports.newPlace = async (body, areaPk) => {
  const { name, latitude, longitude, address } = body;

  const place = await Place.create({
    name,
    latitude,
    longitude,
    address,
    areaPk,
  });
  return place;
};

exports.getPlace = async (placePk) => {
  const place = await Place.findOne({
    where: {
      pk: placePk,
    },
  });

  return place;
};

exports.getPlaces = async (areaPk) => {
  const area = await Area.findOne({
    where: {
      pk: areaPk,
    },
  });
  const areaName = area.name;
  const places = await Place.findAll({
    where: {
      areaPk,
    },
  });

  return { areaName: areaName, places: places };
};