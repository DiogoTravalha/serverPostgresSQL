const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: 'rwfbqgqrwmpanc',
//     password:
//         '0da229cecdc6d2dc89eda70676433959cb42e94f60c49e39f2ab1bc122138fd1',
//     host: 'ec2-54-209-221-231.compute-1.amazonaws.com',
//     port: 5432,
//     database: 'd2018243ih0upg',
// });

const pool = new Pool({
    user: 'postgres',
    password: 'Glock9mm',
    host: 'http://187.85.170.204',
    port: 5433,
    database: 'perntodo',
});

module.exports = pool;
