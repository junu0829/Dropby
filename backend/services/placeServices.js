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

exports.getAreaDrops = async (accessToken, areaPk) => {
  const user = await getUserWithAccess(accessToken);
  console.log(user);
  console.log(user.pk);
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
  let allDrops = {'publicDrops':[], 'myDrops':[]};
  for (let place of AreaPlaces) {
    let placePk = place.dataValues.pk;
    let publicDrops = await Drop.findAll({
      where: {
        placePk,
        isPrivate:false,
      },
      include:["images", "emoji"]
    });
    allDrops['publicDrops'].push(...publicDrops);

    let myDrops = await Drop.findAll({
      where: {
        placePk,
        isPrivate:true,
        creatorPk:user.pk
      }, 
      include:["images", "emoji"]
    });
    allDrops['myDrops'].push(...myDrops)
  }
  console.log(allDrops);
  return {
    areaName: areaName,
    areaPk: areaPk,
    drops:allDrops
  };
};
