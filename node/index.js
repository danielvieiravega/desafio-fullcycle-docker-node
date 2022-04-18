const express = require('express')
const mysql = require('mysql2/promise');
const app = express()
const { uniqueNamesGenerator, names } = require('unique-names-generator');
const port = 3000

//Truncates the table people
app.get('/clean-db', async (req, res) => {
    const connection = await createConnectionAsync();
    await connection.execute('truncate table people')
    res.send('table people was truncated')
})

//Insert a random person in DB and return a list of people
app.get('/',async (req, res) => {
    const connection = await createConnectionAsync();
    await createTableAsync(connection);
    await inserNewPersonAsync(connection);

    let answer = await getPersonFromDbAsync(connection);

    res.send(answer)
})

app.listen(port, () => {
    console.log('Listening on port ' + port)
})

async function getPersonFromDbAsync(connection) {
    const [people] = await connection.execute('SELECT * FROM people');
    let answer = '<h1>Full Cycle Rocks</h1><ul>';
    for (const i in people)
        answer += `<li>${people[i].name}</li>`;
    answer += "</ul>";
    return answer;
}

async function createTableAsync(connection) {
    const createTableSql = `create table if not exists people(id int not null auto_increment, name varchar(255), PRIMARY KEY(id))`;
    await connection.execute(createTableSql);
}

async function inserNewPersonAsync(connection) {
    const uniqueNamesConfig = UniqueNamesGeneratorConfig = {
        dictionaries: [names]
    };
    const sql = `INSERT INTO people(name) values('${uniqueNamesGenerator(uniqueNamesConfig)}')`;
    await connection.query(sql);
}

async function createConnectionAsync() {
    return await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'nodedb'
    });
}