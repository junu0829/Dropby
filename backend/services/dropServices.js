const { Drop, Image } = require("../models");
const { getUserWithAccess } = require("../utils/auth");


exports.newDrop = async (accessToken, body, files, placePk) => {
  const user = await getUserWithAccess(accessToken);
  const {title, content} = body;

  const drop = await Drop.create({
    title,
    content,
    createdAt: Date(),
    creatorPk: user.pk,
    placePk
    });
  if (files) {
    for (let image of files) {
      const drop_image = await Image.create({
        imageUrl:image.location,
        dropPk:drop.pk
    });
    }
  }

  return drop;
};


exports.getDrops = async (placePk) => {
  const drops = await Drop.findAll({
    where:{
      placePk
    },
    include:["images"]
  });
  return drops;
};

exports.updateDrop = async (body, files, dropPk) => {
  const {title, content} = body;
  const drop = await Drop.findOne({
    where:{
      pk:dropPk
    },
  });

  drop.set({
    title:title,
    content:content
  })
  await drop.save();
  Image.destroy({
    where: {
      dropPk:drop.pk
    }
  })
  if (files) {
    for (let image of files) {
      const drop_image = await Image.create({
        imageUrl:image.location,
        dropPk:drop.pk
    });
    }
  }
  // s3에서 이미지 삭제하는 로직 필요할까?
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