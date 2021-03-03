module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
  
    // Create a new Customer
    app.post("/usuario", usuario.create);
  
    // Retrieve all usuario
    app.get("/usuario", usuario.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/usuario/:usuarioId", usuario.findOne);
  
    // Update a Customer with customerId
    app.put("/usuario/:usuarioId", usuario.update);
  
    // Delete a Customer with customerId
    app.delete("/usuario/:usuarioId", usuario.delete);
  
    // Create a new Customer
    app.delete("/usuario", usuario.deleteAll);
  };