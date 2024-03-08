const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "GP",
});


pool.query('SELECT * FROM Utilisateurs', (error, results, fields) => {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        
    }
});


