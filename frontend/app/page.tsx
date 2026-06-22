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
  const [todos, setTodos] =
    useState<Todo[]>([]);

  const [title, setTitle] =
    useState('');

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

  const handleDeleteTodo = async (
    id: number,
  ) => {
    await deleteTodo(id);

    fetchTodos();
  };

  const handleToggle = async (
    id: number,
    completed: boolean,
  ) => {
    await updateTodo(
      id,
      !completed,
    );

    fetchTodos();
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
      }}
    >
      <h1>Todo App</h1>

      <div>
        <input
          type="text"
          placeholder="Enter Todo"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <button
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>

      <br />

      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            marginBottom: '10px',
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              handleToggle(
                todo.id,
                todo.completed,
              )
            }
          />

          <span
            style={{
              marginLeft: '10px',
              textDecoration:
                todo.completed
                  ? 'line-through'
                  : 'none',
            }}
          >
            {todo.title}
          </span>

          <button
            onClick={() =>
              handleDeleteTodo(
                todo.id,
              )
            }
            style={{
              marginLeft: '15px',
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}