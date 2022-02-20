const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'Glock9mm',
    host: 'http://187.85.170.204',
    port: 5433,
    database: 'perntodo',
});

module.exports = pool;
