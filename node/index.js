const express = require('express')
const app = express()
const mysql = require('mysql')
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const { uniqueNamesGenerator, names } = require('unique-names-generator');

let answer = '<h1>Full Cycle Rocks!</h1>\n<ul>';

const connection = mysql.createConnection(config)
const createTableSql = `create table if not exists people(id int not null auto_increment, name varchar(255), PRIMARY KEY(id))`
connection.query(createTableSql)
const uniqueNamesConfig = UniqueNamesGeneratorConfig = {
    dictionaries: [names]
};

const sql = `INSERT INTO people(name) values('${uniqueNamesGenerator(uniqueNamesConfig)}')`
connection.query(sql)

var getPeopleSql = 'SELECT name FROM people';
connection.query(getPeopleSql, function (err, result) {
    if (err) throw err;
    result.forEach(element => {
        answer += `\n<li> ${element.name}</li>`
    });
    answer += "\n</ul>"
});
connection.end()

app.get('/', (req, res) => {
    res.send(answer)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})