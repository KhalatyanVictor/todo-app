import "./App.css";
import Input from "./components/Input";
import Add from "./components/Add";
import List from "./components/List";
import { useEffect, useState } from "react";

interface Todo {
  label: string;
  completed: boolean; 
}

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = () => {
    fetch("/todos")
      .then((res) => res.json())
      .then((data: Todo[]) => setTodos(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodos = [...todos, { label: input, completed: false }];
    setTodos(newTodos);
    setInput("");

    fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodos),
    }).catch(console.error);
  };

  const toggleCompleted = (index: number) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);

    fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodos),
    }).catch(console.error);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);

    fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodos),
    }).catch(console.error);
  };

  return (
    <div className="App">
      <div className="app-container">
        <div className="app-header">
          <h1 className="app-title">Tasks</h1>
          <p className="app-subtitle">Organize your life, one task at a time</p>
        </div>

        <div className="main-card">
          <Input value={input} onChange={setInput} onEnter={addTodo} />
          <Add onClick={addTodo} />

          <List
            todos={todos}
            onToggle={toggleCompleted}
            onClearCompleted={clearCompleted}
          />
        </div>

        <div className="app-footer">Press Enter to quickly add tasks</div>
      </div>
    </div>
  );
}

export default App;
