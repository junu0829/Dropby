const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Area = sequelize.define("Area", {
    pk: {
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name: {
        type:DataTypes.STRING(20),
        allowNull:false,
    },
    polygon: {
        type:DataTypes.GEOMETRY,
        allowNull:false
    }
}, {
    freezeTableName:true,
    timestamps:false
}
);

module.exports = Area;