const Categoria = require("../models/categoria.model.js");

// Create and Save a new categoria
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const categoria = new Categoria({
        nombreCategoria: req.body.nombreCategoria,
    });
    // Save Customer in the database
    Categoria.create(categoria, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the categoria."
        });
      else res.send(data);
    });
  };

// Retrieve all categoria from the database.
exports.findAll = (req, res) => {
  Categoria.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single categoria with a categoriaId
exports.findOne = (req, res) => {
    Categoria.findById(req.params.categoriaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.categoriaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.categoriaId
          });
        }
      } else res.send(data);
    });
  };

// Update a categoria identified by the categoriaId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Categoria.updateById(
      req.params.categoriaId,
      new Categoria(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.categoriaId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.categoriaId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a categoria with the specified categoriaId in the request
exports.delete = (req, res) => {
    Categoria.remove(req.params.categoriaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.categoriaId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.categoriaId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };
// Delete all categoria from the database.
exports.deleteAll = (req, res) => {
    Categoria.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };