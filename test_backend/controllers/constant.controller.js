const db = require("../models");
const Constant = db.constants;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.constants_names && !req.body.constants_values && !req.body.measurements_units) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    for(let i = 0; i < req.body.constants_names.length; i++) {
        if(req.body.constants_names[i] != null && req.body.constants_values[i] != null && req.body.measurements_units[i] != null) {
            let new_constant = {
                name: req.body.constants_names[i],
                value: req.body.constants_values[i],
                measurementUnits: req.body.measurements_units[i]
            }
        
            Constant.create(new_constant)
                // .then(data => {
                //     res.send(data);
                // })
            }
    }
};

exports.getAll = (req, res) => {
    Constant.findAll()
        .then(data => {
            res.send(data)
        })
};

exports.findOne = (req, res) => {

};

exports.getByName = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name field is not set!"
        });
    }

    let condition = { name: { [Op.eq]: req.body.name } };

    Constant.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving constant."
            });
        });
};

exports.update = (req, res) => {
    if (!req.body.name && !req.body.value) {
        res.status(400).send({
            message: "Name or value field is not set!"
        });
    }

    Constant.update(req.body, {
        where: { name: req.body.name }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Constant was updated successfully."
                });
            } else {
                res.send({
                message: `Cannot update Constant with name=${req.body.name}.`
                });
            }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Constant with name=" + req.body.name
        });
    });
};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};
