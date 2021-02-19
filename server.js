const express = require('express');
const app = express();
const promise = require('bluebird');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// pg-promise initialization options:
const initOptions = {
  // Use a custom promise library, instead of the default ES6 Promise:
  promiseLib: promise, 
};

// Database connection parameters:
const config = {
  host: 'localhost',
  port: 5432,
  database: 'example_db',
  user: 'postgres'
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);

// Create the database instance:
const db = pgp(config);

app.get('/juan', (req, res) => {
  // SELECT * FROM example_table WHERE name LIKE 'juan'
  db.one("SELECT * FROM example_table WHERE name ILIKE 'juan'").then((result) => {
    console.log(result);
    res.send(result);
  });
});

app.post('/create', (req, res) => {
  var query ="INSERT INTO example_table (name, ssn) VALUES ($1, $2)"

  db.result(query, [req.body.name, req.body.ssn])
  .then(function (result) {
    console.log(result);
    res.send(result)
  });
})


app.listen(3000, () =>{
  console.log('listening in port 3000');
})

