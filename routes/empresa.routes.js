module.exports = app => {
    const empresa = require("../controllers/empresa.controller.js");
  
    // Create a new Customer
    app.post("/empresa", empresa.create);
  
    // Retrieve all empresa
    app.get("/empresa", empresa.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/empresa/:empresaId", empresa.findOne);
  
    // Update a Customer with customerId
    app.put("/empresa/:empresaId", empresa.update);
  
    // Delete a Customer with customerId
    app.delete("/empresa/:empresaId", empresa.delete);
  
    // Create a new Customer
    app.delete("/empresa", empresa.deleteAll);
  };