// src/components/TodoList.jsx
import React, { useState } from "react";

function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li>
      <label style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          data-testid={`toggle-${todo.id}`}
        />
        {todo.text}
      </label>
      <button
        type="button"
        onClick={() => onRemove(todo.id)}
        aria-label={`remove-${todo.id}`}
      >
        Remove
      </button>
    </li>
  );
}

export default function TodoList({ initialTodos = [] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newTodo = { id: Date.now().toString(), text: text.trim(), done: false };
    setTodos((t) => [...t, newTodo]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos((t) => t.map(td => td.id === id ? { ...td, done: !td.done } : td));
  };

  const removeTodo = (id) => {
    setTodos((t) => t.filter(td => td.id !== id));
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        {/* IMPORTANT: aria-label must be "todo-input" exactly (used by tests) */}
        <input
          aria-label="todo-input"
          placeholder="Add todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onRemove={removeTodo} />
        ))}
      </ul>
    </div>
  );
}
