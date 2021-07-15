const mysqlConnection = require('../database');
const { authoUser } = require('./usuarios');

function getAlumnos(req, res) {

    if (authoUser(req, res)) {
        res.status(401).send('Invalid token');
    } else {
        let sql = 'SELECT al.nombres, al.apellidos, al.mail, co.nombre AS nombreCo, co.horario_dias, cu.nombre AS nombreCu FROM alumnos AS al JOIN inscripciones AS ins ON al.alumnos_id = ins.id_alumnos JOIN comisiones AS co ON co.id_comisiones = ins.id_comisiones JOIN cursos AS cu ON co.id_cursos = cu.id_cursos';
    
        mysqlConnection.query(sql, (err, rows) => {
            if (!err) {
    
                if (rows.length > 0) {
                    let alumnos = [];
    
                    rows.forEach(alumno => {
                        alumnos.push({
                            nombres: alumno.nombres,
                            apellidos: alumno.apellidos,
                            mail: alumno.mail,
                            inscripcion: {
                                nombre: alumno.nombreCo,
                                horario_dias: alumno.horario_dias,
                                curso: alumno.nombreCu
                            }
                        });
                    });
                    res.json(alumnos);
                }
            } else {
                console.log(err);
            }
        });
    }
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
    const { nombres, apellidos, dni, celular, mail, direccion_calle, direccion_numero, direccion_barrio, direccion_localidad, fecha_nacimiento } = req.body;

    let sql = 'INSERT INTO alumnos(nombres, apellidos, dni, celular, mail, direccion_calle, direccion_numero, direccion_barrio, direccion_localidad, fecha_nacimiento) VALUES (?,?,?,?,?,?,?,?,?,?)';
    let valores = [nombres, apellidos, dni, celular, mail, direccion_calle, direccion_numero, direccion_barrio, direccion_localidad, fecha_nacimiento];

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