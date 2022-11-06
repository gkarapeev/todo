import express, { Application, Request, Response } from "express";
import { join } from "path";
import cors from "cors";

import pool from "./db";

const poolche = pool;

const app: Application = express();

app.use(express.static(join(__dirname, '../../frontend/dist')));
app.use(cors());
app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//     res.sendFile(join(__dirname, '../../frontend/dist/index.html'));
// });

// TODO ROUTES

// Create a todo
app.post("/todos", async (req, res) => {
    try {
        const newTodo = await pool.query(
            `INSERT INTO todo (description) VALUES($1) RETURNING *`,
            [req.body.description]
        );
        res.json(newTodo.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${req.params.id};`);
        res.json(todo.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
});

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(`SELECT * FROM todo;`);
        res.json(allTodos.rows);
    } catch (err: any) {
        console.error(err.message);
    }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const description = req.body.description;

        // const todo = await pool.query(`UPDATE todo SET description = ${description} WHERE todo_id = ${id};`);
        const todo = await pool.query(`UPDATE todo SET description = $1 WHERE todo_id = $2;`, [description, id]);

        res.json(todo.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const todo = await pool.query(`DELETE FROM todo WHERE todo_id = ${id};`);
        res.json(`Todo #${req.params.id} was deleted.`);
    } catch (err: any) {
        console.error(err.message);
    }
});


app.listen(3000, () => console.log('Sverver running on port 3000!'));
