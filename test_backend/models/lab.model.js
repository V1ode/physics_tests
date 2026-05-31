const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const Lab = sequelize.define("lab", {
        lab_number: {
            type: Sequelize.BIGINT
        },
        students: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        groups: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    });

    return Lab;
};