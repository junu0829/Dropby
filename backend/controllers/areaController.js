const areaServices = require("../services/areaServices");
const { getAccess } = require("../utils/auth");

exports.newArea = async (req, res, next) => {
    try {
        const { name, points } = req.body;
        const polygon = { type: "Polygon", coordinates: points };
        console.log(polygon);
        const area = await areaServices.newArea(name, polygon);
        res.status(201).json({
            msg: "구역 생성 완료",
            data: area,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

exports.getAreas = async (req, res, next) => {
    try {
        const allAreas = await areaServices.getAreas();
        res.status(200).json({
            msg: "전 구역 조회 완료",
            data: allAreas,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
exports.getPlaces = async (req, res, next) => {
    try {
        const areaPk = req.params.areaPk;
        const places = await areaServices.getPlaces(areaPk);

        res.status(200).json({
            msg: "장소 정보 조회 성공",
            data: places,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAreaDrops = async (req, res, next) => {
    try {
        const accessToken = getAccess(req.headers);
        const areaPk = req.params.areaPk;
        const { areaName, dropsCount, drops } = await areaServices.getAreaDrops(
            accessToken,
            areaPk,
        );

        res.status(200).json({
            msg: `구역 내 드롭 정보 조회 성공`,
            areaName,
            areaPk: areaPk,
            dropsCount,
            data: drops,
        });
    } catch (error) {
        next(error);
    }
};
