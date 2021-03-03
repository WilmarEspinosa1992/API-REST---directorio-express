const Permiso = require("../models/permiso.model.js");

// Create and Save a new permiso
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const permiso = new Permiso({
        nombrePermiso: req.body.nombrePermiso,
    });
    // Save Customer in the database
    Permiso.create(permiso, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Permiso."
        });
      else res.send(data);
    });
  };

// Retrieve all permiso from the database.
exports.findAll = (req, res) => {
  Permiso.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single permiso with a permisoId
exports.findOne = (req, res) => {
    Permiso.findById(req.params.permisoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.permisoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.permisoId
          });
        }
      } else res.send(data);
    });
  };

// Update a permiso identified by the permisoId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Permiso.updateById(
      req.params.permisoId,
      new Permiso(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.permisoId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.permisoId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a permiso with the specified permisoId in the request
exports.delete = (req, res) => {
    Permiso.remove(req.params.permisoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.permisoId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.permisoId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };
// Delete all permiso from the database.
exports.deleteAll = (req, res) => {
    Permiso.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };