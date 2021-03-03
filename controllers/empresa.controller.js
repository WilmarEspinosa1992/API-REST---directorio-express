const Empresa = require("../models/empresa.model.js");

// Create and Save a new empresa
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const empresa = new Empresa({
        nombreEmpresa: req.body.nombreEmpresa,
        telefonoEmpresa: req.body.telefonoEmpresa,
        whatsappEmpresa: req.body.whatsappEmpresa,
        faceboockEmpresa: req.body.faceboockEmpresa,
        instagramEmpresa: req.body.instagramEmpresa,
        inicioPlanEmpresa: req.body.inicioPlanEmpresa,
        finPlanEmpresa: req.body.finPlanEmpresa,
        prioridadEmpresa: req.body.prioridadEmpresa,
        imagenEmpresa: req.body.imagenEmpresa,
        descripcionEmpresa: req.body.descripcionEmpresa,
        estadoEmpresa: req.body.estadoEmpresa,
        idCategoria: req.body.idCategoria
    
    });
    // Save Customer in the database
    Empresa.create(empresa, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the empresa."
        });
      else res.send(data);
    });
  };

// Retrieve all empresa from the database.
exports.findAll = (req, res) => {
  Empresa.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single empresa with a empresaId
exports.findOne = (req, res) => {
    Empresa.findById(req.params.empresaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.empresaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.empresaId
          });
        }
      } else res.send(data);
    });
  };

// Update a empresa identified by the empresaId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Empresa.updateById(
      req.params.empresaId,
      new Empresa(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.empresaId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.empresaId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a empresa with the specified empresaId in the request
exports.delete = (req, res) => {
    Empresa.remove(req.params.empresaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.empresaId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.empresaId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };
// Delete all empresa from the database.
exports.deleteAll = (req, res) => {
    Empresa.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };