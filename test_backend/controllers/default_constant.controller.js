const db = require("../models");
const Default_constant = db.default_constants;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.constants_names && !req.body.constants_values && !req.body.measurements_units) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    for(let i = 0; i < req.body.constants_names.length; i++) {
        if(req.body.constants_names[i] != null && req.body.constants_values[i] != null && req.body.measurements_units[i] != null) {

            let new_default_constant = {
                name: req.body.constants_names[i],
                value: req.body.constants_values[i],
                measurementUnits: req.body.measurements_units[i]
            }
        
            Default_constant.create(new_default_constant)
                // .then(data => {
                //     res.send(data);
                // })
        }
    }

    res.send("success");
};

exports.getAll = (req, res) => {
    // console.log(2)

    Default_constant.findAll()
        .then(data => {
            res.send(data)
        })
};

// exports.findAll = (req, res) => {
//     if (!req.body.lab_number && !req.body.lab_data) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }
//     console.log(200)
//     let conditions = ""

//     // if(req.body.lab_number)
//     //     conditions.lab_number = { [Op.eq]: req.body.lab_number }

//     // if(req.body.lab_data) {
//     //     // conditions.students = [{ [Op.contains] : { [Op.iLike]: [`${req.body.lab_data}`] }  }]
//     //     // conditions.groups = [{ [Op.contains] : { [Op.iLike]: [`${req.body.lab_data}`] }  }]
//     //     // conditions.createdAt = [{ [Op.contains] : { [Op.iLike]: [`${req.body.lab_data}`] }  }]
//     //     conditions.students = [`${req.body.lab_data}`]
//     //     conditions.groups = [`${req.body.lab_data}`]
//     //     conditions.createdAt = [`${req.body.lab_data}`]
//     // }      // { [Op.iLike]: `${req.body.lab_data}` }
//     if(req.body.lab_number)
//         conditions += "lab_number = " + req.body.lab_number 

//     if(req.body.lab_number && req.body.lab_data)
//         conditions += " and ("

//     if(req.body.lab_data) {       
//         conditions += "EXISTS ( " +
//             "SELECT 1 FROM unnest(students) AS student " +
//             "WHERE student iLIKE '%" + req.body.lab_data + "%' " +
//         ") " +
//         "or EXISTS ( " +
//             "SELECT 1 FROM unnest(groups) AS stud_group " +
//             "WHERE stud_group iLIKE '%" + req.body.lab_data + "%' " +
//         ")" 
        
//         if(!Number.isNaN(Number(req.body.lab_data))) {
//             conditions += ' or extract(day from lab."createdAt") = ' + req.body.lab_data +
//             ' or extract(month from lab."createdAt") = ' + req.body.lab_data +
//             ' or extract(hour from lab."createdAt") = ' + req.body.lab_data
//         }
//     }
    
//     if(req.body.lab_number && req.body.lab_data)
//         conditions += ")"

//     console.log(conditions)

//     Lab.findAll({ where: db.Sequelize.literal(conditions) })
//         .then(data => {
//             res.send(data);
//         })
// };

// exports.findOne = (req, res) => {

// };

// exports.update = (req, res) => {

// };

// exports.delete = (req, res) => {

// };

// exports.deleteAll = (req, res) => {

// };
