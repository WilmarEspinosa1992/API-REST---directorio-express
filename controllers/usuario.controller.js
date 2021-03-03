const Usuario = require("../models/usuario.model.js");

// Create and Save a new usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const usuario = new Usuario({
        nombreUsuario: req.body.nombreUsuario,
        identificacionUsuario: req.body.identificacionUsuario,
        emailUsuario: req.body.emailUsuario,
        idRolUsuario: req.body.idRolUsuario,
        userUsuario: req.body.userUsuario,
        passwordUsuario: req.body.passwordUsuario,
        idEmpresa: req.body.idEmpresa
    
    });
    // Save Customer in the database
    Usuario.create(usuario, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the usuario."
        });
      else res.send(data);
    });
  };

// Retrieve all usuario from the database.
exports.findAll = (req, res) => {
  Usuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single usuario with a usuarioId
exports.findOne = (req, res) => {
    Usuario.findById(req.params.usuarioId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.usuarioId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.usuarioId
          });
        }
      } else res.send(data);
    });
  };

// Update a usuario identified by the usuarioId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Usuario.updateById(
      req.params.usuarioId,
      new Usuario(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.usuarioId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.usuarioId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a usuario with the specified usuarioId in the request
exports.delete = (req, res) => {
    Usuario.remove(req.params.usuarioId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.usuarioId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.usuarioId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };
// Delete all usuario from the database.
exports.deleteAll = (req, res) => {
    Usuario.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };