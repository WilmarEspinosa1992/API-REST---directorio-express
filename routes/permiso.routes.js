module.exports = app => {
    const permiso = require("../controllers/permiso.controller.js");
  
    // Create a new Customer
    app.post("/permiso", permiso.create);
  
    // Retrieve all permiso
    app.get("/permiso", permiso.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/permiso/:permisoId", permiso.findOne);
  
    // Update a Customer with customerId
    app.put("/permiso/:permisoId", permiso.update);
  
    // Delete a Customer with customerId
    app.delete("/permiso/:permisoId", permiso.delete);
  
    // Create a new Customer
    app.delete("/permiso", permiso.deleteAll);
  };