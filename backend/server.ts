import express, { Application } from "express";
import { join } from "path";
import cors from "cors";

import pool from "./db";

const app: Application = express();

app.use(express.static(join(__dirname, '../../frontend/dist')));
app.use(cors());
app.use(express.json());

// ROUTES
// Create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(`INSERT INTO todo(description) VALUES('${description}') RETURNING *;`);
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
        const todo = await pool.query(`UPDATE todo SET description = '${description}' WHERE todo_id = '${id}';`);

        res.json(todo.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`DELETE FROM todo WHERE todo_id = ${id};`);
        res.json(`Todo #${id} was deleted.`);
    } catch (err: any) {
        console.error(err.message);
    }
});


app.listen(3000, () => console.log('Sverver running on port 3000!'));
