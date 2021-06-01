const { mysqlConnection } = require('../database');

function getCursos(req, res) {
    mysqlConnection.query('SELECT * FROM cursos', (err, rows) => {
        if (!err) {
            res.json({ ok: true, rows});
        } else {
            res.json({ ok: false, err});
        }
    });
}

function getCurso(req, res) {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM cursos WHERE id_cursos = ?', [id], (err, rows) => {
        if (!err) {
            res.json({ ok: true, rows});
        } else {
            res.json({ ok: false, err});
        }
    });
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
    const { nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros } = req.body;

    let sql = 'INSERT INTO cursos(nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros) VALUES (?,?,?,?,?,?,?,?,?,?)';
    let valores = [nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros];

    mysqlConnection.query(sql, valores, (err) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            res.json({ ok: false, err});
        }
    });
}

function updateCurso(req, res) {
    const { id } = req.params;
    const { nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros } = req.body;

    let sql = 'UPDATE cursos SET nombre=?, descripcion=?, publico_destinado=?, requisitos=?, url_imagen_presentacion=?, url_video_presentacion=?, precio_inscripcion=?, precio_cuota=?, cantidad_cuotas=?, id_subrubros=? WHERE id_cursos=' + id;
    let valores = [nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros];

    mysqlConnection.query(sql, valores, (err) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            res,json({ ok: false, err });
        }
    });
}

module.exports = {
    getCursos,
    getCurso,
    deleteCurso,
    createCurso,
    updateCurso
}