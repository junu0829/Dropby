const placeServices = require('../services/placeServices');

exports.newPlace = async (req, res, next) => {
    try {
        const areaPk = req.params.areaPk;
        const place = await placeServices.newPlace(req.body, areaPk);
        res.status(201).json({
            msg:'장소 생성 완료',
            data:place
        });

    }catch(error) {
        console.log(error.message);
        next(error);
    }
}

exports.getPlace = async (req, res, next) => {
    try {
        const placePk = req.params.placePk;
        const place = await placeServices.getPlace(placePk);

        res.status(200).json({
            msg: '장소 정보 조회 성공',
            data:place
        })
    } catch(error) {
        next(error);
    }
}

exports.getPlaces = async (req, res, next) => {
    try {
        const areaPk = req.params.areaPk;
        const placesData = await placeServices.getPlaces(areaPk);

        res.status(200).json({
            msg: `${placesData.areaName} 구역정보 조회 성공`,
            areaName:placesData.areaName,
            data:placesData.places
        })
    } catch(error) {
        next(error);
    }
}

exports.getAreaDrops = async (req, res, next) => {
    try {
        const areaPk = req.params.areaPk;
        const dropsData = await placeServices.getAreaDrops(areaPk);

        res.status(200).json({
            msg: `구역 내 드롭 정보 조회 성공`,
            areaName:dropsData.areaName,
            areaPk:areaPk,
            drops:dropsData.drops
        })
    } catch(error) {
        next(error);
    }
}