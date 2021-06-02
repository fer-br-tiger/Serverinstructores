const mysqlConnection = require('../database');

function getAlumnos(req, res) {
    mysqlConnection.query('SELECT * FROM alumnos', (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
}

function getAlumno(req, res) {
    const { dni } = req.params;
    mysqlConnection.query('SELECT * FROM alumnos WHERE dni = ?', [dni], (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function deleteAlumno(req, res) {
    const { dni } = req.params;
    mysqlConnection.query('DELETE FROM alumnos WHERE dni = ?', [dni], (err) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            console.log(err);
        }
    });
}

function createAlumno(req, res) {
    const { nombres, apellidos, dni, celular, mail, direccion_calle, direccion_numero, direccion_barrio, direccion_localidad } = req.body;

    let sql = 'INSERT INTO alumnos(nombres, apellidos, dni, celular, mail, direccion_calle, direccion_numero, direccion_barrio, direccion_localidad) VALUES (?,?,?,?,?,?,?,?,?)';
    let valores = [nombres, apellidos, dni, celular, mail, direccion_calle, direccion_numero, direccion_barrio, direccion_localidad];

    mysqlConnection.query(sql, valores, (err) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            console.log(err);
        }
    });
}

function updateAlumno(req, res) {
    const dniP = req.params.dni;
    const { nombres, apellidos, dni, celular, mail, direccion_calle, direccion_numero, direccion_barrio, direccion_localidad } = req.body;

    let sql = 'UPDATE alumnos SET nombres=?, apellidos=?, dni=?, celular=?, mail=?, direccion_calle=?, direccion_numero=?, direccion_barrio=?, direccion_localidad=? WHERE dni=' + dniP;
    let valores = [nombres, apellidos, dni, celular, mail, direccion_calle, direccion_numero, direccion_barrio, direccion_localidad];

    mysqlConnection.query(sql, valores, (err) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    getAlumnos,
    getAlumno,
    deleteAlumno,
    createAlumno,
    updateAlumno
}