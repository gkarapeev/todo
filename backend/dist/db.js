"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require("pg").Pool;
const pool = new Pool({
    user: "gk",
    host: "localhost",
    database: "todos",
    password: "hohoboho",
    port: 5432,
});
exports.default = pool;
