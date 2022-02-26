module.exports = app => {
    const cardItems = require("../controllers/cardItems.controller.js");
    var router = require("express").Router();
    // Create a new cardItems
    router.post("/", cardItems.create);
    // Retrieve all cardItems
    router.get("/", cardItems.findAll);
    // Retrieve a single cardItems with id
    router.get("/:id", cardItems.findOne);
    // Update a cardItems with id
    router.put("/:id", cardItems.update);
    // Delete a cardItems with id
    router.delete("/:id", cardItems.delete);
    // Delete all cardItems
    router.delete("/", cardItems.deleteAll);
    app.use('/api/cardItems', router);
  };