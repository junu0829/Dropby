const { Drop, Image, Emoji } = require("../models");
const { getUserWithAccess } = require("../utils/auth");
const { getWrittenPlaceName } = require("../utils/place");


exports.newDrop = async (accessToken, body, files, placePk) => {
  const user = await getUserWithAccess(accessToken);
  let {title, content, emojiSlug, isPrivate} = body;
  isPrivate = (isPrivate === 'true');
  
  const emoji = await Emoji.findOne({
    where:{
      slug:emojiSlug
    }
  })

  const drop = await Drop.create({
    title,
    content,
    createdAt: Date(),
    creatorPk: user.pk,
    placePk,
    emojiPk:emoji.pk,
    isPrivate
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

exports.getDrops = async (accessToken, placePk) => {
  const publicDrops = await Drop.findAll({
    where: {
      placePk,
      isPrivate:false,
    }
  });

  const user = await getUserWithAccess(accessToken);

  const myDrops = await Drop.findAll({
    where:{
      placePk,
      isPrivate:true,
      creatorPk:user.pk
    },
    include:["images", "emoji"],
  })
  const writtenPlace = await getWrittenPlaceName(publicDrops[0]);
  const dropsCount = publicDrops.length + myDrops.length;

  return {
    writtenPlace,
    dropsCount,
    publicDrops,
    myDrops
  }
}
exports.getPublicDrops = async (accessToken, placePk) => {
  const publicDrops = await Drop.findAll({
    where:{
      placePk,
      isPrivate:false,
    },
    include:["images", "emoji"]
  });

  const writtenPlace = await getWrittenPlaceName(publicDrops[0]);
  const dropsCount = publicDrops.length;

  return {
          writtenPlace,
          dropsCount,
          publicDrops,
          };
};

exports.getMyDrops = async (accessToken, placePk) => {
  const user = await getUserWithAccess(accessToken);

  const myDrops = await Drop.findAll({
    where: {
      placePk,
      isPrivate:true,
      creatorPk:user.pk
    },
    include:["images", "emoji"],
  });

  const writtenPlace = await getWrittenPlaceName(myDrops[0]);
  const dropsCount = myDrops.length;
  return {
    writtenPlace,
    dropsCount, 
    myDrops
  }
}
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

exports.getDrop = async (dropPk) => {
  const drop = await Drop.findOne({
    where:{
      pk:dropPk
    }
  });

  const writtenPlace = await getWrittenPlaceName(drop);

  return {
    writtenPlace,
    drop
  };
}