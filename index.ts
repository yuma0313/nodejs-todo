import express from "express";

const app = express();

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

app.use(express.json());

const todos: Todo[] = [
  { id: 1, title: "todo1", done: false },
  { id: 2, title: "todo2", done: false },
];

app.get("/", (req, res) => {
  res.send(todos);
});

app.get("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === Number(req.params.id));
  res.send(todo);
});

app.post("/", (req, res) => {
  const newTodo: Todo = {
    id: todos.length + 1,
    title: req.body.title,
    done: false,
  };
  todos.push(newTodo);
  res.send(todos);
});

app.put("/:id", (req, res) => {
  const updatedTodos: Todo[] = todos.map((todo) => {
    if (todo.id === Number(req.params.id)) {
      return { ...todo, title: req.body.title, done: req.body.done };
    }
    return todo;
  });
  res.send(updatedTodos);
});

app.put("/done-todo/:id", (req, res) => {
  const updatedTodos: Todo[] = todos.map((todo) => {
    if (todo.id === Number(req.params.id)) {
      return { ...todo, done: true };
    }
    return todo;
  });
  res.send(updatedTodos);
});

app.delete("/:id", (req, res) => {
  const deletedTodos: Todo[] = todos.filter(
    (todo) => todo.id !== Number(req.params.id)
  );
  res.send(deletedTodos);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
