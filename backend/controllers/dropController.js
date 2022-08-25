const dropServices = require("../services/dropServices");
const { getAccess } = require("../utils/auth");

exports.newDrop = async (req, res, next) => {
  try {
    const { placePk } = req.params;
    const accessToken = getAccess(req.headers);
    const drop = await dropServices.newDrop(accessToken, req.body, req.files, placePk);

    res.status(201).json({
      msg: "드롭 생성 완료",
      data: drop,
      success:true
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

exports.getDrops = async (req, res, next) => {
  try {
    const { placePk } = req.params;
    const accessToken = getAccess(req.headers);

    const {writtenPlace, dropsCount, publicDrops, myDrops} = await dropServices.getDrops(accessToken, placePk);

    res.status(200).json({
      msg:'해당 장소 전체 드롭 조회 완료',
      writtenPlace,
      dropsCount,
      data: {
        publicDrops,
        myDrops,
      }
    })
  } catch (error) {
    next(error);
  }
}
exports.getPublicDrops = async (req, res, next) => {
  try {
    const { placePk } = req.params;
    const accessToken = getAccess(req.headers);
    const { writtenPlace, dropsCount, publicDrops } = await dropServices.getPublicDrops(accessToken, placePk);

    res.status(200).json({
      msg: "드롭 조회 완료",
      writtenPlace,
      dropsCount,
      data: publicDrops
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyDrops = async (req, res, next) => {

  try {
    const { placePk } = req.params;
    const accessToken = getAccess(req.headers);
    const { writtenPlace, dropsCount, myDrops } = await dropServices.getMyDrops(accessToken, placePk);

    res.status(200).json({
      msg: "드롭 조회 완료",
      writtenPlace,
      dropsCount,
      data: myDrops
    });
  } catch (error) {
    next(error);
  }
}
exports.updateDrop = async (req, res, next) => {
  try {
    const dropPk = req.params.dropPk;
    const updatedDrop = await dropServices.updateDrop(req.body, req.files, dropPk);
    res.status(200).json({
      msg: "드롭 내용 수정 완료",
      data: updatedDrop,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteDrop = async (req, res, next) => {
  try {
    const dropPk = req.params.dropPk;
    const dropDeleted = await dropServices.deleteDrop(dropPk);
    res.status(200).json({
      msg: "드롭 삭제 완료",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getDrop = async (req, res, next) => {
  try {
    const dropPk = req.params.dropPk;
    const accessToken = getAccess(req.headers);
    const {writtenPlace, drop, isLiked} = await dropServices.getDrop(accessToken, dropPk);
    res.status(200).json({
      msg:'단일 드롭 조회 완료',
      writtenPlace,
      data:drop,
      isLiked:isLiked
    })
  } catch (error) {
    next(error);
  }
}

exports.toggleDropLike = async (req, res, next) => {
  try {
    const dropPk = req.params.dropPk;
    const accessToken = getAccess(req.headers);
    const status = await dropServices.toggleDropLike(accessToken, dropPk);

    if (status === 'ON') {
      res.status(200).json({
        msg:'좋아요 등록',
        status:"ON"
      })
    }
    if (status === 'OFF') {
      res.status(200).json({
        msg:'좋아요 해제',
        status:"OFF"
      });
    }
  } catch(error) {
    console.log(error);
  }
}