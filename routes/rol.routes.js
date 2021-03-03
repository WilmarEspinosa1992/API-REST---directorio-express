module.exports = app => {
    const rol = require("../controllers/rol.controller.js");
  
    // Create a new Customer
    app.post("/rol", rol.create);
  
    // Retrieve all rol
    app.get("/rol", rol.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/rol/:rolId", rol.findOne);
  
    // Update a Customer with customerId
    app.put("/rol/:rolId", rol.update);
  
    // Delete a Customer with customerId
    app.delete("/rol/:rolId", rol.delete);
  
    // Create a new Customer
    app.delete("/rol", rol.deleteAll);
  };