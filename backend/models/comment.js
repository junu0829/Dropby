const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Comment = sequelize.define("Comment", {
                pk: {
                    type:DataTypes.INTEGER,
                    allowNull:false,
                    primaryKey:true,
                    autoIncrement:true,
                },
                content: {
                    type:DataTypes.TEXT,
                    allowNull:false,
                },
                createdAt:{
                    type:DataTypes.DATE,
                    defaultValue: DataTypes.NOW
                },
                likesCount:{
                    type:DataTypes.INTEGER,
                    defaultValue:0,
                    allowNull:false,
                }
            }, {
                freezeTableName:true,
                timestamps:false
            }
        );

module.exports = Comment;
