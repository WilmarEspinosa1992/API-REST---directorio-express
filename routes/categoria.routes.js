module.exports = app => {
    const categoria = require("../controllers/categoria.controller.js");
  
    // Create a new Customer
    app.post("/categoria", categoria.create);
  
    // Retrieve all categoria
    app.get("/categoria", categoria.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/categoria/:categoriaId", categoria.findOne);
  
    // Update a Customer with customerId
    app.put("/categoria/:categoriaId", categoria.update);
  
    // Delete a Customer with customerId
    app.delete("/categoria/:categoriaId", categoria.delete);
  
    // Create a new Customer
    app.delete("/categoria", categoria.deleteAll);
  };