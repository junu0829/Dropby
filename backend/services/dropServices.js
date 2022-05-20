const { Drop } = require("../models");
const { getUserWithAccess } = require("../utils/auth");


exports.newDrop = async (accessToken, body, placePk) => {
  const user = await getUserWithAccess(accessToken);
  const {title, content} = body;

  const drop = await Drop.create({
    title,
    content,
    createdAt: Date(),
    creatorPk: user.pk,
    placePk
  });
  return drop;
};


exports.getDrops = async (placePk) => {
  const drops = await Drop.findAll({
    where:{
      placePk
    }
  });
  return drops;
};

exports.updateDrop = async (body, dropPk) => {
  const {title, content} = body;
  const drop = await Drop.findOne({
    where:{
      pk:dropPk
    }
  });

  drop.content = content;
  drop.title = title;
  await drop.save();

  return drop;

}

exports.deleteDrop = async (dropPk) => {
  const drop = await Drop.findOne({
    where:{
      pk:dropPk
    }
  });

  await drop.destroy();

  return true;

}