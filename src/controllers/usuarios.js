var jwt = require('jsonwebtoken');
const { mysqlConnection } = require('../database');

function autheUser(req, res) {
    const { username, password } = req.body;

    if (!(username === 'jorge' && password === '1234')) {
        res.status(401).send({
            error: 'Usuario o contraseña inválido'
        });
        return;
    }
    var tokenData = {
        username: username
        // ANY DATA
    };
    var token = jwt.sign(tokenData, 'Secret Password', {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    res.send({
        token
    });
}

function authoUser(req, res) {
    var token = req.headers['authorization'];
    if (!token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return;
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, 'Secret Password', function (err, user) {
        if (err) {
            res.status(401).send({
                error: "Token inválido"
            });
        } else {
            mysqlConnection.query('SELECT * FROM usuarios', (err, rows) => {
                if (!err) {
                    res.send({
                        message: "Usuarios del sistema",
                        usuarios: rows
                    });
                } else {
                    console.log(err);
                    res.send({
                        message: 'No se pudo consultar en la BD',
                        usuarios: null
                    });
                }
            });
        }
    });
}

module.exports = {
    autheUser,
    authoUser
}