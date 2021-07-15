const mysqlConnection = require('../database');
const { authoUser } = require('./usuarios');

function getCursos(req, res) {
    let sql = 'SELECT cu.id_cursos, cu.nombre, cu.descripcion, cu.url_imagen_presentacion, cu.precio_inscripcion, ins.nombres, ins.apellidos, ins.foto_perfil FROM cursos AS cu INNER JOIN instructores AS ins ON cu.id_instructores = ins.id_instructores ORDER BY cu.id_cursos';

    mysqlConnection.query(sql, (err, rows) => {
        if (!err) {

            if (rows.length > 0) {
                let cursos = [];
                
                rows.forEach(curso => {
                    cursos.push({
                        id_cursos: curso.id_cursos,
                        nombre: curso.nombre,
                        descripcion: curso.descripcion,
                        url_imagen_presentacion: curso.url_imagen_presentacion,
                        precio_inscripcion: curso.precio_inscripcion,
                        instructor: {
                            nombres: curso.nombres,
                            apellidos: curso.apellidos,
                            foto_perfil: curso.foto_perfil
                        }
                    });
                });

                res.json({ ok: true, cursos });
            } else {
                res.json({ ok: false, message: 'No hay cursos.' });
            }
        } else {
            res.json({ ok: false, err });
        }
    });
}

function getAdminCursos(req, res) {
    if (authoUser(req, res)) {
        res.status(401).send('Invalid token');
    } else {
        let sql = 'SELECT id_cursos, url_imagen_presentacion, nombre, habilita_inscripcion, estado_publicacion FROM cursos';

        mysqlConnection.query(sql, (err, rows) => {
            if (!err) {
                res.json({ ok: true, rows });
            } else {
                res.json({ ok: false, err });
            }
        });
    }
}

function getCurso(req, res) {
    const { id } = req.params;
    
    let sql = 'SELECT cu.id_cursos, cu.nombre AS nombreCu, cu.descripcion, cu.publico_destinado, cu.requisitos, cu.url_imagen_presentacion, cu.precio_inscripcion, cu.precio_cuota, ins.nombres, ins.apellidos, co.id_comisiones, co.nombre AS nombreCo, co.horario_dias FROM cursos AS cu INNER JOIN instructores AS ins ON cu.id_instructores = ins.id_instructores INNER JOIN comisiones AS co ON cu.id_cursos = co.id_cursos WHERE cu.id_cursos = ?';

    mysqlConnection.query(sql, [id], (err, row) => {
        if (!err) {

            if (row.length > 0) {
                let curso = {
                    id_cursos: row[0].id_cursos,
                    nombre: row[0].nombreCu,
                    descripcion: row[0].descripcion,
                    publico_destinado: row[0].publico_destinado,
                    requisitos: row[0].requisitos,
                    url_imagen_presentacion: row[0].url_imagen_presentacion,
                    precio_inscripcion: row[0].precio_inscripcion,
                    precio_cuota: row[0].precio_cuota,
                    instructor: {
                        nombres: row[0].nombres,
                        apellidos: row[0].apellidos
                    },
                    comisiones: []
                };

                row.forEach(com => {
                    curso.comisiones.push({
                        id_comisiones: com.id_comisiones,
                        nombre: com.nombreCo,
                        horario_dias: com.horario_dias
                    });
                });

                res.json({ ok: true, curso });
            }
        } else {
            res.json({ ok: false, err });
        }
    });
}

function getAdminCurso(req, res) {
    if (authoUser(req, res)) {
        res.status(401).send('Invalid token');
    } else {
        const { id } = req.params;

        let sql = 'SELECT cu.nombre, cu.descripcion, cu.publico_destinado, cu.requisitos, cu.url_imagen_presentacion, cu.url_video_presentacion, cu.precio_inscripcion, cu.precio_cuota, cu.cantidad_cuotas, cu.id_subrubros, cu.estado_publicacion, cu.habilita_inscripcion FROM cursos AS cu WHERE cu.id_cursos = ?';

        mysqlConnection.query(sql, [id], (err, row) => {
            if (!err) {
                if (row.length > 0) {
                    res.json(row);
                }
            } else {
                res.json({ ok: false, err });
            }
        });
    }
}

function deleteCurso(req, res) {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM cursos WHERE id_cursos = ?', [id], (err) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            res.json({ ok: false, err });
        }
    });
}

function createCurso(req, res) {
    const { nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros, estado_publicacion, habilita_inscripcion } = req.body;

    let sql = 'INSERT INTO cursos(nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros, estado_publicacion, habilita_inscripcion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    let valores = [nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros, estado_publicacion, habilita_inscripcion];

    mysqlConnection.query(sql, valores, (err) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            res.json({ ok: false, err });
        }
    });
}

function updateCurso(req, res) {
    const { id } = req.params;
    const { nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros, estado_publicacion, habilita_inscripcion} = req.body;

    let sql = 'UPDATE cursos SET nombre=?, descripcion=?, publico_destinado=?, requisitos=?, url_imagen_presentacion=?, url_video_presentacion=?, precio_inscripcion=?, precio_cuota=?, cantidad_cuotas=?, id_subrubros=?, estado_publicacion=?, habilita_inscripcion=? WHERE id_cursos=' + id;
    let valores = [nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros, estado_publicacion, habilita_inscripcion];

    mysqlConnection.query(sql, valores, (err) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            res.json({ ok: false, err });
        }
    });
}

function getSubrubro(req, res) {
    mysqlConnection.query('SELECT id_subrubros, nombre FROM subrubros', (err, rows) => {
        if (!err) {
            res.json({ ok: true, rows });
        } else {
            res.json({ ok: false, err });
        }
    })
}

module.exports = {
    getCursos,
    getAdminCursos,
    getCurso,
    getAdminCurso,
    deleteCurso,
    createCurso,
    updateCurso,
    getSubrubro
}