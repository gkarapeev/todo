"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use(express_1.default.static((0, path_1.join)(__dirname, '../../frontend/dist')));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ROUTES
// Create a todo
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description } = req.body;
        const newTodo = yield db_1.default.query(`INSERT INTO todo(description) VALUES('${description}') RETURNING *;`);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
// Get a todo
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield db_1.default.query(`SELECT * FROM todo WHERE todo_id = ${req.params.id};`);
        res.json(todo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
// Get all todos
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield db_1.default.query(`SELECT * FROM todo;`);
        res.json(allTodos.rows);
    }
    catch (err) {
        console.error(err.message);
    }
}));
// Update a todo
app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const description = req.body.description;
        // const todo = await pool.query(`UPDATE todo SET description = ${description} WHERE todo_id = ${id};`);
        const todo = yield db_1.default.query(`UPDATE todo SET description = '${description}' WHERE todo_id = '${id}';`);
        res.json(todo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
// Delete a todo
app.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield db_1.default.query(`DELETE FROM todo WHERE todo_id = ${id};`);
        res.json(`Todo #${id} was deleted.`);
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.listen(3000, () => console.log('Sverver running on port 3000!'));
