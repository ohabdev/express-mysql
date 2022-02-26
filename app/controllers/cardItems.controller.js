const CardItems = require("../models/cardItems.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Tutorial
  const cardItems = new CardItems({
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity
  });
  // Save CardItems in the database
  CardItems.create(cardItems, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CardItems."
      });
    else res.send(data);
  });
};
// Retrieve all CardItems from the database (with condition).
exports.findAll = (req, res) => {
    const product_id = req.query.product_id;
    CardItems.getAll(product_id, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving CardItems."
        });
        else res.send(data);
    });
};
// Find a single CardItems with a id
exports.findOne = (req, res) => {
    CardItems.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Tutorial with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a CardItems identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  CardItems.updateById(
    req.params.id,
    new CardItems(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Card Items with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Card Items with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a CardItems with the specified id in the request
exports.delete = (req, res) => {
    CardItems.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found CardItems with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete CardItems with id " + req.params.id
            });
          }
        } else res.send({ message: `CardItems was deleted successfully!` });
      });
};
// Delete all CardItems from the database.
exports.deleteAll = (req, res) => {
    CardItems.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all CardItems."
          });
        else res.send({ message: `All CardItems were deleted successfully!` });
      });
};