const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Image = sequelize.define(
    "Image",
    {
        pk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    },
);

module.exports = Image;
