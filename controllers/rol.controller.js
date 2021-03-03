const Rol = require("../models/rol.model.js");

// Create and Save a new rol
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const rol = new Rol({
        nombreRol: req.body.nombreRol,
    });
    // Save Customer in the database
    Rol.create(rol, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the rol."
        });
      else res.send(data);
    });
  };

// Retrieve all rol from the database.
exports.findAll = (req, res) => {
  Rol.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single rol with a rolId
exports.findOne = (req, res) => {
    Rol.findById(req.params.rolId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.rolId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.rolId
          });
        }
      } else res.send(data);
    });
  };

// Update a rol identified by the rolId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Rol.updateById(
      req.params.rolId,
      new Rol(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.rolId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.rolId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a rol with the specified rolId in the request
exports.delete = (req, res) => {
    Rol.remove(req.params.rolId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.rolId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.rolId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };
// Delete all rol from the database.
exports.deleteAll = (req, res) => {
    Rol.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };