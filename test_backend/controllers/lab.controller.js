const db = require("../models");
const Lab = db.labs;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.lab_number || !req.body.students || !req.body.groups) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let new_lab = {
        lab_number: req.body.lab_number,
        students: req.body.students,
        groups: req.body.groups
    }

    Lab.create(new_lab)
        .then(data => {
            res.send(data);
        })
};

exports.getAll = (req, res) => {
    // console.log(2)

    Lab.findAll()
        .then(data => {
            // console.log(data)
            res.send(data)
        })
};

exports.findAll = (req, res) => {
    if (!req.body.lab_number && !req.body.lab_data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(200)
    let conditions = ""

    // if(req.body.lab_number)
    //     conditions.lab_number = { [Op.eq]: req.body.lab_number }

    // if(req.body.lab_data) {
    //     // conditions.students = [{ [Op.contains] : { [Op.iLike]: [`${req.body.lab_data}`] }  }]
    //     // conditions.groups = [{ [Op.contains] : { [Op.iLike]: [`${req.body.lab_data}`] }  }]
    //     // conditions.createdAt = [{ [Op.contains] : { [Op.iLike]: [`${req.body.lab_data}`] }  }]
    //     conditions.students = [`${req.body.lab_data}`]
    //     conditions.groups = [`${req.body.lab_data}`]
    //     conditions.createdAt = [`${req.body.lab_data}`]
    // }      // { [Op.iLike]: `${req.body.lab_data}` }
    if(req.body.lab_number)
        conditions += "lab_number = " + req.body.lab_number 

    if(req.body.lab_number && req.body.lab_data)
        conditions += " and ("

    if(req.body.lab_data) {       
        conditions += "EXISTS ( " +
            "SELECT 1 FROM unnest(students) AS student " +
            "WHERE student iLIKE '%" + req.body.lab_data + "%' " +
        ") " +
        "or EXISTS ( " +
            "SELECT 1 FROM unnest(groups) AS stud_group " +
            "WHERE stud_group iLIKE '%" + req.body.lab_data + "%' " +
        ")" 
        
        if(!Number.isNaN(Number(req.body.lab_data))) {
            conditions += ' or extract(day from lab."createdAt") = ' + req.body.lab_data +
            ' or extract(month from lab."createdAt") = ' + req.body.lab_data +
            ' or extract(hour from lab."createdAt") = ' + req.body.lab_data
        }
    }
    
    if(req.body.lab_number && req.body.lab_data)
        conditions += ")"

    console.log(conditions)

    Lab.findAll({ where: db.Sequelize.literal(conditions) })
        .then(data => {
            res.send(data);
        })
};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};
