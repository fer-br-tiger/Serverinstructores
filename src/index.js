const app = require('./app');
const { startConnection } = require('./database');

function main() {
    startConnection();
    app.listen(app.get('port'), () => {
        console.log('Server on port', app.get('port'));
    });
    //console.log('Server on port', app.get('port'));
}

main();