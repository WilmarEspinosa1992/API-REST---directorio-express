module.exports = app => {
    const producto = require("../controllers/producto.controller.js");
  
    // Create a new Customer
    app.post("/producto", producto.create);
  
    // Retrieve all producto
    app.get("/producto", producto.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/producto/:productoId", producto.findOne);
  
    // Update a Customer with customerId
    app.put("/producto/:productoId", producto.update);
  
    // Delete a Customer with customerId
    app.delete("/producto/:productoId", producto.delete);
  
    // Create a new Customer
    app.delete("/producto", producto.deleteAll);
  };