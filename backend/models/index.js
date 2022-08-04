const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const db = {};

db.Drop = require('./drop');
db.User = require('./user');
db.Place = require('./place');
db.Area = require('./area');
db.Emoji = require('./emoji');
db.Image = require('./image');
db.Comment = require('./comment');
db.LikeDrop = require('./likeDrop');
db.LikeComment = require('./likeComment');

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// 한 사용자는 여러 개의 드롭을 가질(만들) 수 있음.
db.User.hasMany(db.Drop, {
    foreignKey:{
        name:'creatorPk',
        allowNull:false
    },
});

db.Drop.belongsTo(db.User, {
    as:'creator',
    foreignKey:{
        name:'creatorPk',
        allowNull:false
    },
});

//한 장소에는 여러 개의 드롭이 존재할 수 있음
db.Place.hasMany(db.Drop, {
    foreignKey:{
        name:'placePk',
        allowNull:false
    },
});

db.Drop.belongsTo(db.Place, {
    foreignKey: {
        name:'placePk',
        allowNull:false
    },
});

//한 구역에는 여러 개의 장소가 존재할 수 있음

db.Area.hasMany(db.Place, {
    foreignKey: {
        name:'areaPk',
        allowNull:false
    },
});

db.Place.belongsTo(db.Area, {
    foreignKey: {
        name:'areaPk',
        allowNull:false
    },
});

//한 드롭은 여러 개의 이미지를 가질 수 있음.
db.Drop.hasMany(db.Image, {
    as:'images',
    foreignKey: {
        name:'dropPk',
        allowNull:true
    },
});

db.Image.belongsTo(db.Drop, {
    foreignKey: {
        name:'dropPk',
        allowNull:true
    },
});
//한 드롭에 하나의 이모지를 등록할 수 있음.

db.Emoji.hasMany(db.Drop, {
    foreignKey:{
        name:'emojiPk',
        allowNull:true
    }
})
db.Drop.belongsTo(db.Emoji, {
    as:'emoji',
    foreignKey:{
        name:'emojiPk',
        allowNull:true
    },
})

// 한 사용자는 여러 개의 댓글을 작성할 수 있음.
db.User.hasMany(db.Comment, {
    foreignKey:{
        name:'creatorPk',
        allowNull:false
    },
});

db.Comment.belongsTo(db.User, {
    foreignKey:{
        name:'creatorPk',
        allowNull:false
    },
    onDelete:'CASCADE'
});

// 한 드롭에는 여러 개의 댓글이 존재할 수 있음.
// onDelete 속성 수정해야 함.
db.Drop.hasMany(db.Comment, {
    foreignKey:{
        name:'dropPk',
        allowNull:false
    },
});

db.Comment.belongsTo(db.Drop, {
    foreignKey:{
        name:'dropPk',
        allowNull:false
    },
    onDelete:'CASCADE'
});

// 드롭 좋아요 관계 설정
db.User.belongsToMany(db.Drop, {
    through:'likeDrop',
});

db.Drop.belongsToMany(db.User, {
    through:'LikeDrop'
})

db.User.hasMany(db.LikeDrop);
db.LikeDrop.belongsTo(db.User);

db.Drop.hasMany(db.LikeDrop);
db.LikeDrop.belongsTo(db.Drop);

//댓글 좋아요 관계 설정
db.User.belongsToMany(db.Comment, {
    through:'LikeComment'
});

db.Comment.belongsToMany(db.User, {
    through:'LikeComment'
});

db.User.hasMany(db.LikeComment);
db.LikeComment.belongsTo(db.User);

db.Comment.hasMany(db.LikeComment);
db.LikeComment.belongsTo(db.Comment);

module.exports = db;
