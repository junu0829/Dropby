const areaServices = require('../services/areaServices');

exports.newArea = async (req, res, next) => {
    try {
        const {name, points} = req.body;
        const polygon = {type: 'Polygon', coordinates:points};
        console.log(polygon);
        const area = await areaServices.newArea(name, polygon);
        res.status(201).json({
            msg:'구역 생성 완료',
            data:area
        });

    }catch(error) {
        console.log(error.message);
        next(error);
    }
}

exports.getPlaces = async (req, res, next) => {
    try {
        const areaPk = req.params.areaPk;
        const places = await areaServices.getPlaces(areaPk);

        res.status(200).json({
            msg: '장소 정보 조회 성공',
            data:places
        })
    } catch(error) {
        next(error);
    }
}