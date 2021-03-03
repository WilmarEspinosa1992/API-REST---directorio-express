const sql = require("./db.js");

// constructor
const Categoria = function(categoria) {
  this.nombreCategoria = categoria.nombreCategoria;
};

Categoria.create = (newCategoria, result) => {
  sql.query("INSERT INTO categoria SET ?", newCategoria, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created categoria: ", { id: res.insertId, ...newCategoria });
    result(null, { id: res.insertId, ...newCategoria });
  });
};

Categoria.findById = (categoriaId, result) => {
  sql.query(`SELECT * FROM categoria WHERE idCategoria = ${categoriaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found categoria: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found categoria with the id
    result({ kind: "not_found" }, null);
  });
};

Categoria.getAll = result => {
  sql.query("SELECT * FROM categoria", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categorias: ", res);
    result(null, res);
  });
};

Categoria.updateById = (id, categoria, result) => {
  sql.query(
    "UPDATE categoria SET nombreCategoria = ? WHERE idCategoria = ?",
    [Categoria.nombreCategoria, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found categoria with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...categoria });
      result(null, { id: id, ...categoria });
    }
  );
};

Categoria.remove = (id, result) => {
  sql.query("DELETE FROM categoria WHERE idCategoria = ?", id, (err, res) => {
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

    console.log("deleted categoria with id: ", id);
    result(null, res);
  });
};

Categoria.removeAll = result => {
  sql.query("DELETE FROM categoria", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Categoria;