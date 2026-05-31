const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const labs = require("./controllers/lab.controller.js");
const constants = require("./controllers/constant.controller.js");
const default_constants = require("./controllers/default_constant.controller.js");

const db = require("./models");

const app = express();

let corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });


// Роуты

app.get("/", (req, res) => {
    res.send("<h1>Главная</h1>")
});


//          Labs table

app.get("/createDBData", (req, res) => {
    labs.create(req, res)
});

app.get("/labsHistory", (req, res) => {
    console.log("getAll labs")
    labs.getAll(req, res)
});

app.get("/wasDataClearedThisYear", (req, res) => {
    console.log("wasDataClearedThisYear labs")
    labs.wasDataClearedThisYear(req, res)
});

app.post("/createLabHistory", (req, res) => {
    console.log("labs create")
    labs.create(req, res)
});

app.post("/findLab", (req, res) => {
    console.log("find")
    labs.findAll(req, res)
});

//          Deafault_constants table

app.get("/getAllDefaultConstants", (req, res) => {
    console.log("default_constants getAll")
    default_constants.getAll(req, res)
});

app.post("/createDefaultConstants", (req, res) => {
    console.log("default_constants create")
    default_constants.create(req, res)
    constants.create(req, res)
});

//          Constants table

app.get("/getAllConstants", (req, res) => {
    console.log("constants getAll")
    constants.getAll(req, res)
});

app.post("/changeConstant", (req, res) => {
    console.log("constants update")
    constants.update(req, res)
});

app.post("/getConstantByName", (req, res) => {
    console.log("constants getByName")
    constants.getByName(req, res)
});

  // set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});