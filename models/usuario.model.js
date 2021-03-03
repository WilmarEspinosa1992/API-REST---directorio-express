const sql = require("./db.js");

// constructor
const Usuario = function(usuario) {
  this.nombreUsuario = usuario.nombreUsuario;
  this.identificacionUsuario = usuario.identificacionUsuario;
  this.emailUsuario = usuario.emailUsuario;
  this.idRolUsuario = usuario.idRolUsuario;
  this.userUsuario = usuario.userUsuario;
  this.passwordUsuario = usuario.passwordUsuario;
  this.idEmpresa = usuario.idEmpresa;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usuario: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.findById = (usuarioId, result) => {
  sql.query(`SELECT * FROM usuario WHERE idUsuario = ${usuarioId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found usuario with the id
    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = result => {
  sql.query("SELECT * FROM usuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuario SET nombreUsuario = ?, identificacionUsuario = ?, emailUsuario = ?, idRolUsuario = ?, userUsuario = ?, passwordUsuario = ? WHERE idUsuario = ?",
    [Usuario.nombreUsuario, Usuario.identificacionUsuario, Usuario.emailUsuario, Usuario.idRolUsuario , Usuario.userUsuario , Usuario.passwordUsuario, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found usuario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...usuario });
      result(null, { id: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuario WHERE idUsuario = ?", id, (err, res) => {
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

    console.log("deleted usuario with id: ", id);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Usuario;