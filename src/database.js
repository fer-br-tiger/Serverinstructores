const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbInstructores',
    multipleStatements: true
});

function startConnection() {
    mysqlConnection.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Database is connected');
        }
    });
}

module.exports = {
    startConnection,
    mysqlConnection
}