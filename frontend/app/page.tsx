'use client';

import { useEffect, useState } from 'react';

import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from '../src/services/todo.service';

import { Todo } from '../src/types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!title.trim()) return;
    await createTodo(title);
    setTitle('');
    fetchTodos();
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleToggle = async (id: number, completed: boolean) => {
    await updateTodo(id, !completed);
    fetchTodos();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="todo-card">
      {/* Header */}
      <div className="todo-header">
        <h1>Todo App</h1>
        <p>Stay organized, one task at a time</p>
      </div>

      {/* Input Row */}
      <div className="todo-input-row">
        <input
          id="todo-input"
          className="todo-input"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          id="add-todo-btn"
          className="todo-add-btn"
          onClick={handleAddTodo}
        >
          + Add Task
        </button>
      </div>

      {/* Divider */}
      <div className="todo-divider" />

      {/* Counter */}
      {todos.length > 0 && (
        <div className="todo-counter">
          <span>Tasks</span>
          <span className="count-badge">
            {completedCount} / {todos.length} done
          </span>
        </div>
      )}

      {/* Todo List */}
      {todos.length === 0 ? (
        <div className="todo-empty">
          <div className="empty-icon">📝</div>
          <p>No tasks yet — add one above!</p>
        </div>
      ) : (
        <div className="todo-list">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <label className="todo-checkbox">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id, todo.completed)}
                />
                <span className="checkmark" />
              </label>

              <span className="todo-title">{todo.title}</span>

              <button
                className="todo-delete-btn"
                onClick={() => handleDeleteTodo(todo.id)}
                aria-label={`Delete ${todo.title}`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}