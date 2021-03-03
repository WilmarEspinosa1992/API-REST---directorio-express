const sql = require("./db.js");

// constructor
const Rol = function(rol) {
  this.nombreRol = rol.nombreRol;
};

Rol.create = (newRol, result) => {
  sql.query("INSERT INTO rol SET ?", newRol, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created rol: ", { id: res.insertId, ...newRol });
    result(null, { id: res.insertId, ...newRol });
  });
};

Rol.findById = (rolId, result) => {
  sql.query(`SELECT * FROM rol WHERE idRol = ${rolId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found rol: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found rol with the id
    result({ kind: "not_found" }, null);
  });
};

Rol.getAll = result => {
  sql.query("SELECT * FROM rol", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("rols: ", res);
    result(null, res);
  });
};

Rol.updateById = (id, rol, result) => {
  sql.query(
    "UPDATE rol SET nombreRol = ? WHERE idRol = ?",
    [Rol.nombreRol, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found rol with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...rol });
      result(null, { id: id, ...rol });
    }
  );
};

Rol.remove = (id, result) => {
  sql.query("DELETE FROM rol WHERE idrol = ?", id, (err, res) => {
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

    console.log("deleted rol with id: ", id);
    result(null, res);
  });
};

Rol.removeAll = result => {
  sql.query("DELETE FROM rol", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Rol;