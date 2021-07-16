var jwt = require('jsonwebtoken');
const mysqlConnection = require('../database');

function autheUser(req, res) {
    const { username, password } = req.body;

    mysqlConnection.query('SELECT username, password FROM usuarios WHERE username=? AND password=?', [username, password], (err, row) => {
        if (row.length === 0) {
            res.status(401).send({error: 'Invalid username or password'});
        } else {
            var tokenData = {
                username: username
                // ANY DATA
            };
            var token = jwt.sign(tokenData, 'Secret Password', {
                expiresIn: 60 * 60 * 2 // expires in 24 hours
            });
        
            res.json({
                token
            });
        }
    });
}

/* function authoUser(req, res) {
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
} */

function authoUser(req, res) {
    var token = req.headers['authorization'];
    token = token.replace('Bearer ', '');
    
    try {
        jwt.verify(token, 'Secret Password');
    } catch (err) {
        return err;
    }
    
}

function authoAdmin(req, res) {
    if (authoUser(req, res)) {
        res.status(401).send('Invalid token');
    }
}

module.exports = {
    autheUser,
    authoUser,
    authoAdmin
}