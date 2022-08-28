const { Place, Area } = require("../models");
const { logger } = require("../utils/winston");

exports.newPlace = async (body, areaPk) => {
  try {
    const { name, latitude, longitude, address } = body;

    const place = await Place.create({
      name,
      latitude,
      longitude,
      address,
      areaPk,
    });
    logger.info(`New place ${name} saved`);
    return place;
  } catch (error) {
    logger.error(`Failed to save a new place : ${error.message}`);
    throw new Error("새 장소 정보 등록에 실패하였습니다.");
  }
};

exports.getPlace = async (placePk) => {
  try {
    const place = await Place.findOne({
      where: {
        pk: placePk,
      },
    });
    logger.info(`One place of Id ${placePk}} retrieved`);
    return place;
  } catch (error) {
    logger.error(`Failed to retrieve a place of Id ${placePk} : ${error.message}`);
    throw new Error(`${placePk}번 장소 정보 조회에 실패하였습니다.`);
  }
};

exports.getPlaces = async (areaPk) => {
  try {
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
    logger.info(`All places of area Id ${areaPk} retrieved`);
    return { areaName: areaName, places: places };
  } catch (error) {
    logger.error(`Failed to retrieve all places of area Id ${areaPk}`);
    throw new Error(`${areaPk}번 구역 내 모든 장소 조회에 실패하였습니다.`);
  }
};