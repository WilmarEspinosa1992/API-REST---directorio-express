const Producto = require("../models/producto.model.js");

// Create and Save a new producto
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const producto = new Producto({
        imagenProducto: req.body.imagenProducto,
        nombreProducto: req.body.nombreProducto,
        descripcionProducto: req.body.descripcionProducto,
        precioProducto: req.body.precioProducto,
        estadoProducto: req.body.estadoProducto,
        idEmpresa: req.body.idEmpresa,
    });
    
    // Save Customer in the database
    Producto.create(producto, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Producto."
        });
      else res.send(data);
    });
  };

// Retrieve all Producto from the database.
exports.findAll = (req, res) => {
  Producto.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single producto with a productoId
exports.findOne = (req, res) => {
    Producto.findById(req.params.productoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.productoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.productoId
          });
        }
      } else res.send(data);
    });
  };

// Update a producto identified by the productoId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Producto.updateById(
      req.params.productoId,
      new Producto(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.productoId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.productoId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a producto with the specified productoId in the request
exports.delete = (req, res) => {
    Producto.remove(req.params.productoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.productoId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.productoId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };
// Delete all producto from the database.
exports.deleteAll = (req, res) => {
    Producto.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };