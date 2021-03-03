const sql = require("./db.js");

// constructor
const Permiso = function(permiso) {
  this.nombrePermiso = permiso.nombrePermiso;
};

Permiso.create = (newPermiso, result) => {
  sql.query("INSERT INTO permiso SET ?", newPermiso, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created permiso: ", { id: res.insertId, ...newPermiso });
    result(null, { id: res.insertId, ...newPermiso });
  });
};

Permiso.findById = (permisoId, result) => {
  sql.query(`SELECT * FROM permiso WHERE idPermiso = ${permisoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found permiso: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found permiso with the id
    result({ kind: "not_found" }, null);
  });
};

Permiso.getAll = result => {
  sql.query("SELECT * FROM permiso", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("permisos: ", res);
    result(null, res);
  });
};

Permiso.updateById = (id, permiso, result) => {
  sql.query(
    "UPDATE permiso SET nombrePermiso = ? WHERE idPermiso = ?",
    [Permiso.nombrePermiso, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found permiso with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...permiso });
      result(null, { id: id, ...permiso });
    }
  );
};

Permiso.remove = (id, result) => {
  sql.query("DELETE FROM permiso WHERE idPermiso = ?", id, (err, res) => {
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

    console.log("deleted permiso with id: ", id);
    result(null, res);
  });
};

Permiso.removeAll = result => {
  sql.query("DELETE FROM permiso", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Permiso;