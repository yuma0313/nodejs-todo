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
const promise_1 = __importDefault(require("mysql2/promise"));
const mysql_config_1 = require("./mysql.config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pool = promise_1.default.createPool(mysql_config_1.dbConfig);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query("SELECT * FROM todos");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "データベースエラー" });
    }
}));
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id", req.params.id);
    try {
        const [rows] = yield pool.query("SELECT * FROM todos WHERE id = ?", [
            req.params.id,
        ]);
        console.log("rows", rows);
        if (Array.isArray(rows)) {
            if (rows.length === 0) {
                return res.status(404).json({ error: "Todo not found" });
            }
            res.json(rows[0]);
        }
        else {
            return res.status(500).json({ error: "Unexpected query result" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "データベースエラー" });
    }
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query("INSERT INTO todos (title, done) VALUES (?, ?)", [req.body.title, req.body.done]);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "データベースエラー" });
    }
}));
app.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query("UPDATE todos SET title = ?, done = ? WHERE id = ?", [req.body.title, req.body.done, req.params.id]);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "データベースエラー" });
    }
}));
app.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query("DELETE FROM todos WHERE id = ?", [
            req.params.id,
        ]);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "データベースエラー" });
    }
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
