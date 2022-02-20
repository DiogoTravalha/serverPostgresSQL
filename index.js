const express = require(`express`);
const app = express();
const cors = require('cors');
const pool = require('./db');
const https = require('https');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3333;

//Middleware
app.use(cors());
app.use(express.json());

//Routes

// app.get('/', (req, res) => {
//     res.send('Estou Online');
// });

//Create

app.post('/', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES($1) RETURNING *',
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//Get all

app.get('/', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//Get a todo

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
            id,
        ]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//Update
app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2',
            [description, id]
        );
        res.json('Atualizado com Sucesso');
    } catch (error) {
        console.log(error.message);
    }
});

//Delete
app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id = $1',
            [id]
        );
        res.json('Deletado com Sucesso');
    } catch (error) {
        console.log(error.message);
    }
});

//Server
// const sslServer = https.createServer(
//     // {
//     //     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     //     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//     // },
//     app
// );

app.listen(port, () => {
    console.info(`server start ${port}`);
});
