const express = require('express');
const router = express.Router();
const { getAlumnos, createAlumno, getAlumno, deleteAlumno, updateAlumno } = require('../controllers/alumno');
const { getCursos, getCurso, deleteCurso, createCurso, updateCurso, getAdminCursos, getSubrubro, getAdminCurso } = require('../controllers/curso');
const { autheUser, authoAdmin } = require('../controllers/usuarios');

router.route('/alumnos')
    .get(getAlumnos)
    .post(createAlumno);
router.route('/alumnos/dni/:dni')
    .get(getAlumno)
    .delete(deleteAlumno)
    .put(updateAlumno);
router.route('/cursos')
    .get(getCursos)
    .post(createCurso);
router.route('/cursos/:id')
    .get(getCurso)
    .delete(deleteCurso)
    .put(updateCurso);
router.post('/login', autheUser);
router.get('/usuarios', authoAdmin);
router.get('/subrubros', getSubrubro);

router.get('/admin/cursos', getAdminCursos);
router.get('/admin/cursos/:id', getAdminCurso);

module.exports = router;