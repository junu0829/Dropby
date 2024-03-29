const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Drop = sequelize.define(
    "Drop",
    {
        pk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isPrivate: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        likesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    },
);

module.exports = Drop;
