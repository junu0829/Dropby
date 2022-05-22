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
    const drops = await dropServices.getDrops(placePk);

    res.status(200).json({
      msg: "드롭 조회 완료",
      data: drops,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateDrop = async (req, res, next) => {
  try {
    const dropPk = req.params.dropPk;
    const updatedDrop = await dropServices.updateDrop(req.body, dropPk);
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
