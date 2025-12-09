import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Study Jest", completed: true },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <AddTodoForm onAddTodo={addTodo} />

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid="todo-item"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}

            <button
              data-testid="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

