const express = require(`express`);
const app = express();
const pool = require('./db');

//Middleware
const configs = {
    caminho: 'build', //Aqui será definido a pasta de saída onde contém o index.html e os outros arquivos.
    forcarHTTPS: false, //Defina para true se desejar que o redirecionamento para HTTPS seja forçado (é necessário certificado SSL ativo)
    port: process.env.PORT || 3333,
};

app.use();
app.use(express.json());

//Routes

//Get all

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//Create

app.post('/todos', async (req, res) => {
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

//Get a todo

app.get('/todos/:id', async (req, res) => {
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
app.put('/todos/:id', async (req, res) => {
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
app.delete('/todos/:id', async (req, res) => {
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

// const port = process.env.PORT || 3333;

// app.listen(port, () => {
//     console.info(`server start ${port}`);
// });
app.listen(configs.port, () => {
    console.log(`Escutando na ${configs.port}!`);
});
