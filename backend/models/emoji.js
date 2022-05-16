const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Emoji = sequelize.define("Emoji", {
    pk: {
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    icon: {
        type:DataTypes.STRING(),
        allowNull:false,
    },
    skinToneSupport: {
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    name: {
        type:DataTypes.STRING(30),
        allowNull:false
    },
    slug: {
        type:DataTypes.STRING(30),
        allowNull:false
    },
    unicode_version: {
        type:DataTypes.STRING(5),
        allowNull:false
    },
    emoji_version: {
        type:DataTypes.STRING(5),
        allowNull:false
    }

}, {
    freezeTableName:true,
    timestamps:false,
    charset:'utf8mb4'
}
);

module.exports = Emoji;
