const sql = require("./db.js");

// constructor
const Empresa = function(empresa) {
  this.nombreEmpresa = empresa.nombreEmpresa;
  this.telefonoEmpresa = empresa.telefonoEmpresa;
  this.whatsappEmpresa = empresa.whatsappEmpresa;
  this.faceboockEmpresa = empresa.faceboockEmpresa;
  this.instagramEmpresa = empresa.instagramEmpresa;
  this.inicioPlanEmpresa = empresa.inicioPlanEmpresa;
  this.finPlanEmpresa = empresa.finPlanEmpresa;
  this.prioridadEmpresa = empresa.prioridadEmpresa;
  this.imagenEmpresa = empresa.imagenEmpresa;
  this.descripcionEmpresa = empresa.descripcionEmpresa;
  this.estadoEmpresa = empresa.estadoEmpresa;
  this.idCategoria = empresa.idCategoria;
};

Empresa.create = (newEmpresa, result) => {
    console.log(newEmpresa);
  sql.query("INSERT INTO empresa SET ?", newEmpresa, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created empresa: ", { id: res.insertId, ...newEmpresa });
    result(null, { id: res.insertId, ...newEmpresa });
  });
};

Empresa.findById = (empresaId, result) => {
  sql.query(`SELECT * FROM empresa WHERE idEmpresa = ${empresaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found empresa: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found empresa with the id
    result({ kind: "not_found" }, null);
  });
};

Empresa.getAll = result => {
  sql.query("SELECT * FROM empresa", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("empresas: ", res);
    result(null, res);
  });
};

Empresa.updateById = (id, empresa, result) => {
  sql.query(
    "UPDATE empresa SET nombreEmpresa = ?, whatsappEmpresa = ?, faceboockEmpresa = ?, instagramEmpresa = ?, inicioPlanEmpresa = ?, finPlanEmpresa = ?, prioridadEmpresa = ?, imagenEmpresa = ?, descripcionEmpresa = ?, estadoEmpresa = ? WHERE idEmpresa = ?",
    [empresa.nombreEmpresa, empresa.whatsappEmpresa, empresa.faceboockEmpresa, empresa.instagramEmpresa , empresa.inicioPlanEmpresa , empresa.finPlanEmpresa , empresa.prioridadEmpresa, empresa.imagenEmpresa , empresa.descripcionEmpresa , empresa.estadoEmpresa, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found empresa with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...empresa });
      result(null, { id: id, ...empresa });
    }
  );
};

Empresa.remove = (id, result) => {
  sql.query("DELETE FROM empresa WHERE idEmpresa = ?", id, (err, res) => {
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

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Empresa.removeAll = result => {
  sql.query("DELETE FROM empresa", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Empresa;