const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const Constant = sequelize.define("default_constant", {
        name: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.NUMBER
        },
        measurementUnits: {
            type: DataTypes.STRING
        }
    });

    return Constant;
};