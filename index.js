const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
//required route
require("./routes/empresa.routes.js")(app);
require("./routes/usuario.routes.js")(app);
require("./routes/rol.routes.js")(app);
require("./routes/permiso.routes.js")(app);
require("./routes/categoria.routes.js")(app);
require("./routes/producto.routes.js")(app);
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});