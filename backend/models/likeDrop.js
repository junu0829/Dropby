const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const LikeDrop = sequelize.define("LikeDrop", {
                pk: {
                    type:DataTypes.INTEGER,
                    allowNull:false,
                    primaryKey:true,
                    autoIncrement:true,
                },
                likedAt:{
                    type:DataTypes.DATE,
                    defaultValue: DataTypes.NOW
                },
            }, {
                freezeTableName:true,
                timestamps:false
            }
        );

module.exports = LikeDrop;
