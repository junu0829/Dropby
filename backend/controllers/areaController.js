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
