const express = require('express');
const router = express.Router();
const { getAlumnos, createAlumno, getAlumno, deleteAlumno, updateAlumno } = require('../controllers/alumno');
const { autheUser, authoUser } = require('../controllers/usuarios');

router.route('/alumnos')
    .get(getAlumnos)
    .post(createAlumno);
router.route('/alumnos/dni/:dni')
    .get(getAlumno)
    .delete(deleteAlumno)
    .put(updateAlumno);
router.post('/login', autheUser);
router.get('/usuarios', authoUser);
module.exports = router;