const { Connection, Request } = require('tedious');
const config = require('./config/dbConfig.js');

let connection = new Connection(config);

connection.on('connect', (err) => {
    if (err) return console.log(err);

    console.log('Connected Danada!!');
    executeStatement();
});

function executeStatement() {
    let query = "select count(*) from jm.Person";

    request = new Request(query, function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }

        connection.close();
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log(column.value);
            }
        });
    });

    request.on('done', function (rowCount, more) {
        console.log(rowCount + ' rows returned');
    });

    // In SQL Server 2000 you may need: connection.execSqlBatch(request);
    connection.execSql(request);
}