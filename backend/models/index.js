const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const db = {};

db.Drop = require('./drop');
db.User = require('./user');
db.Place = require('./place');
db.Area = require('./area');
db.Emoji = require('./emoji');
db.Image = require('./image');

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// 한 사용자는 여러 개의 드롭을 가질(만들) 수 있음.
db.User.hasMany(db.Drop, {
    foreignKey:{
        name:'creatorPk',
        allowNull:false
    },
    onDelete:'CASCADE'
});

db.Drop.belongsTo(db.User, {
    foreignKey:{
        name:'creatorPk',
        allowNull:false
    },
    onDelete:'CASCADE'
});

//한 장소에는 여러 개의 드롭이 존재할 수 있음
db.Place.hasMany(db.Drop, {
    foreignKey:{
        name:'placePk',
        allowNull:false
    },
    onDelete:'CASCADE'
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
    onDelete:'CASCADE'
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
    onDelete:'CASCADE'
});

db.Image.belongsTo(db.Drop, {
    foreignKey: {
        name:'dropPk',
        allowNull:true
    },
});
//한 드롭에 하나의 이모지를 등록할 수 있음.
db.Drop.hasOne(db.Emoji, {
    foreignKey:{
        name:'dropPk',
        allowNull:false
    },
})

module.exports = db;
