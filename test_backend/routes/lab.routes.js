module.exports = app => {
    const labs = require("../controllers/lab.controller.js");

    var router = require("express").Router();


    // router.post("/", tutorials.create);


    router.get("/labsHistory", labs.findAll);

    // router.get("/published", tutorials.findAllPublished);

    // router.get("/:id", tutorials.findOne);

    // router.put("/:id", tutorials.update);

    // router.delete("/:id", tutorials.delete);

    // router.delete("/", tutorials.deleteAll);

    // app.use('/api/tutorials', router);
};