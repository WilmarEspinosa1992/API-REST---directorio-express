const sql = require("./db.js");

// constructor
const Producto = function(producto) {
  this.imagenProducto = producto.imagenProducto;
  this.nombreProducto = producto.nombreProducto;
  this.descripcionProducto = producto.descripcionProducto;
  this.precioProducto = producto.precioProducto;
  this.estadoProducto = producto.estadoProducto;
  this.idEmpresa = producto.idEmpresa;
};

Producto.create = (newProducto, result) => {
  sql.query("INSERT INTO producto SET ?", newProducto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created producto: ", { id: res.insertId, ...newProducto });
    result(null, { id: res.insertId, ...newProducto });
  });
};

Producto.findById = (productoId, result) => {
  sql.query(`SELECT * FROM producto WHERE idProducto = ${productoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found producto: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found producto with the id
    result({ kind: "not_found" }, null);
  });
};

Producto.getAll = result => {
  sql.query("SELECT * FROM producto", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Productos: ", res);
    result(null, res);
  });
};

Producto.updateById = (id, producto, result) => {
  sql.query(
    "UPDATE producto SET nombreProducto = ? WHERE idProducto = ?",
    [Producto.nombreProducto, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found producto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...producto });
      result(null, { id: id, ...producto });
    }
  );
};

Producto.remove = (id, result) => {
  sql.query("DELETE FROM producto WHERE idProducto = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted producto with id: ", id);
    result(null, res);
  });
};

Producto.removeAll = result => {
  sql.query("DELETE FROM producto", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Producto;