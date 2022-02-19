const express = require(`express`);
const app = express();
const cors = require('cors');
const pool = require('./db');

const port = process.env.PORT || 3333;

//Middleware
app.use(cors());
app.use(express.json());

//Routes

app.get('/', cors(), (req, res) => {
    res.send('Estou Online');
});

//Create

app.post('/todos', cors(), async (req, res) => {
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

app.get('/todos', cors(), async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//Get a todo

app.get('/todos/:id', cors(), async (req, res) => {
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
app.put('/todos/:id', cors(), async (req, res) => {
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
app.delete('/todos/:id', cors(), async (req, res) => {
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
app.listen(port, () => {
    console.info(`server start ${port}`);
});
