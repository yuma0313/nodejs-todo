"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const todos = [
    { id: 1, title: "todo1", done: false },
    { id: 2, title: "todo2", done: false },
];
app.get("/", (req, res) => {
    res.send(todos);
});
app.post("/", (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        done: false,
    };
    todos.push(newTodo);
    res.send(todos);
});
app.put("/", (req, res) => {
    const updatedTodos = todos.map((todo) => {
        if (todo.id === req.body.id) {
            return Object.assign(Object.assign({}, todo), { title: req.body.title, done: req.body.done });
        }
        return todo;
    });
    res.send(updatedTodos);
});
app.put("/done", (req, res) => {
    const updatedTodos = todos.map((todo) => {
        if (todo.id === req.body.id) {
            return Object.assign(Object.assign({}, todo), { done: req.body.done });
        }
        return todo;
    });
    res.send(updatedTodos);
});
app.delete("/", (req, res) => {
    const deletedTodos = todos.filter((todo) => todo.id !== req.body.id);
    res.send(deletedTodos);
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
