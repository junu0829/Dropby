const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Drop = sequelize.define("Drop", {
                id: {
                    type:DataTypes.INTEGER,
                    allowNull:false,
                    primaryKey:true,
                    autoIncrement:true,
                },
                category : {
                    type:DataTypes.TINYINT,
                    allowNull:false,
                },
                totalSubmit: {
                    type:DataTypes.TEXT,
                    allowNull:false,
                },
                enfp:{
                    type:DataTypes.INTEGER,
                    allowNull:false
                },
                isPrivate: {
                    type:DataTypes.BOOLEAN,
                    defaultValue:false,
                    allowNull:false,
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

module.exports = Drop;
