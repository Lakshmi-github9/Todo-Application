import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  List,
  Box,
} from "@mui/material";
import { EditTodoDialog } from './components/EditTodo';
import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types';
import { loadTodos, saveTodos } from './utils';

const todoId = () => Math.random().toString(36).slice(2, 9);

function App() {
  // Application state
  const [todos, setTodos] = useState<Todo[]>(loadTodos());
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Edit dialog state
  const [editing, setEditing] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDue, setEditDue] = useState("");

  // Persist todos whenever they change
  useEffect(() => saveTodos(todos), [todos]);

  const addTask = () => {
    if (!title.trim()) return;

    setTodos([
      {
        id: todoId(),
        title: title.trim(),
        dueDate: dueDate || new Date().toISOString().slice(0, 10),
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...todos,
    ]);

    setTitle("");
    setDueDate("");
  };

  // Toggle completion state
  const toggleComplete = (id: string) =>
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  // Remove a task
  const remove = (id: string) => setTodos(todos.filter(t => t.id !== id));

  // Open edit dialog
  const openEdit = (t: Todo) => {
    setEditing(t);
    setEditTitle(t.title);
    setEditDue(t.dueDate);
  };

  // Save edited task
  const saveEdit = () => {
    if (!editing) return;

    setTodos(todos.map(t =>
      t.id === editing.id ? { ...t, title: editTitle, dueDate: editDue } : t
    ));

    setEditing(null);
  };

  return (
   <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">To Do Application</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Paper sx={{ p: 2 }}>
          <TodoForm
            title={title}
            dueDate={dueDate}
            onTitleChange={setTitle}
            onDateChange={setDueDate}
            onAdd={addTask}
          />

          <List sx={{ mt: 2 }}>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleComplete}
                onEdit={openEdit}
                onDelete={remove}
              />
            ))}
          </List>
        </Paper>
      </Container>

      <EditTodoDialog
        open={!!editing}
        title={editTitle}
        dueDate={editDue}
        onTitleChange={setEditTitle}
        onDateChange={setEditDue}
        onClose={() => setEditing(null)}
        onSave={saveEdit}
      />
    </Box>
  );
}

export default App;
