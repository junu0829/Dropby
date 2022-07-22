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
            }, {
                freezeTableName:true,
                timestamps:false
            }
        );

module.exports = Comment;
